 param (
    [switch]$update,
    [string]$path,
    [string]$currentdir
 )
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;

if($update){
    $exepath =  Get-WmiObject win32_service | ?{$_.Name -eq 'backup380.exe'} |select Pathname|Format-Wide -Property PathName -AutoSize|Out-String
    $exepath = $exepath.Trim();
    $exepath = $exepath.Replace("`"","");
    Stop-Service -Name "Backup380";
    sc.exe delete "backup380.exe";
    $path = "$exepath\..\..\..\..";
    del -Force -r -exclude "Repository.db" "$path\*";
    $directoryInfo = Get-ChildItem $path | Measure-Object
    
    if($directoryInfo.count -ne 1){
        echo "Success: The previous version was successfully removed";
    }else{
        echo "Error: Removing previous version failed";
    }
}



cd $path;

curl -Uri https://github.com/20150055/backup/archive/gh-pages.zip -OutFile master.zip;
Expand-Archive -Path master.zip -DestinationPath $path;
Copy-Item "backup-gh-pages\*" -Destination $path -Recurse -Force;
del master.zip;
del -r backup-gh-pages;

if((Test-Path -Path ".\service") -and (Test-Path -Path ".\installService")){
    echo "Success: Successfully downloaded and extracted the Backup Data";
}else{
    echo "Error while downloading or extracting the Backup380 data. Check your Internet Connection";
}


if(!$update){
    Invoke-Expression "npm -v" -ErrorVariable badoutput;
    if($badoutput){
        curl -Uri https://nodejs.org/dist/v10.13.0/node-v10.13.0-x64.msi -OutFile node.msi;
        [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\nodejs", [EnvironmentVariableTarget]::Machine);
        msiexec /quiet /a $path\node.msi /log $path\log.txt TARGETDIR=`"C:\Program Files`";
        $counter = 0;
        do {
            $counter++;

            Start-Sleep -Seconds 15;
            $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User");
            Invoke-Expression "npm -v" -ErrorVariable installstatus;
            
        } while (((echo $installstatus) -match "term") -and ($counter -ne 15))
        
        if($counter -eq 15){
            echo "Error: Timeout while waiting for node installation to finish, check your internet connection and try again. Or try to install Node.js manually if the problem still persists";
            break;
        }else{
            echo "Success: Node is now installed";
        }
    } 
}
cd $path\service;
npm install;
cd $path\installService;
npm install node-windows;
node installService.js;

$Shell = New-Object -ComObject ("WScript.Shell");
$Favorite = $Shell.CreateShortcut($env:PUBLIC+ "\Desktop\Backup.url");
$Favorite.TargetPath = "http://localhost:8380";
$Favorite.Save();
if(Test-Path -path "$env:PUBLIC\Desktop\Backup.url"){
    echo "Success: The Desktop Shortcut for Backup380 is now installed";
}else{
    echo "Error: Creating the desktop shortcut failed";
}
$count = 0;
do{
    $count++;
    if($count -eq 20){
		Start-Service Backup380;
        break;
    }
    $service = Get-Service | Where-Object {$_.DisplayName -eq "Backup380"} | Where-Object {$_.Status -eq "Running"}
    Start-Sleep -Seconds 10
}while(!$service)

if($count -eq 20){
    echo "Error: Starting the Service failed";
}else{
    Start-Process http://localhost:8380/setup
}


