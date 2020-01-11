param (
    [string]$path,
    [string]$mode,
    [switch] $update
)
if((!$path -or !$mode)){
    echo "Error: Missing arguments";
    exit;
}
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;
if(!(Test-Path -Path $path )){
    New-Item -ItemType Directory -Force -Path $path;
}
if ($mode -eq "d") {

    cd "$path";
    try {
        $R = curl -Uri https://github.com/20150055/backup/archive/gh-pages.zip -OutFile master.zip;
    }
    catch {
        $message = $_.Exception.Message;
        echo "Error: Downloading of Backup380 failed check your internet connection";
        exit;
    }

    Expand-Archive -Path master.zip -DestinationPath $path;
    Copy-Item "backup-gh-pages\*" -Destination $path -Recurse -Force;
    del master.zip;
    del -r backup-gh-pages;
    $version = Invoke-WebRequest -Uri "https://api.github.com/repos/restic/restic/releases/latest" -UseBasicParsing | ConvertFrom-Json| Select tag_name;
    $version = $version.tag_name;
    $version = $version.substring(1);
    
    curl "https://github.com/restic/restic/releases/download/v$version/restic_${version}_windows_amd64.zip" -o "restic.zip";
    Expand-Archive "restic.zip";
    Rename-Item -Path "./restic/restic_${version}_windows_amd64.exe" -NewName "restic.exe";
    Copy-Item "./restic/restic.exe" -Destination "service/build";
    del restic.zip;
    del -r restic;


    curl "https://download.sysinternals.com/files/PSTools.zip" -o "PsTools.zip";
    Expand-Archive "PsTools.zip";
    Copy-Item "./PsTools/PsExec.exe" -Destination "scripts";
    del PsTools.zip;
    del -r PsTools;

    if ((Test-Path -Path ".\service") -and (Test-Path -Path ".\installService")) {
        echo "Success: Successfully downloaded and extracted the Backup Data";
    }
    else {
        echo "Error: while downloading or extracting the Backup380 data. Check your Internet Connection";
        exit;
    }
    cd $path\service;
    npm install;
    cd $path\scripts;
    npm install;
    node generatecert.js;
    cd $path\installService;
    npm install node-windows;
    echo "Operation finished";

}
if ($mode -eq "u") {
    $exepath = Get-WmiObject win32_service | ? {$_.Name -eq 'backup380.exe'} |select Pathname|Format-Wide -Property PathName -AutoSize|Out-String
    $exepath = $exepath.Trim();
    $exepath = $exepath.Replace("`"", "");
    Stop-Service -Name "Backup380";
    sc.exe delete "backup380.exe";
    $curDir = "$exepath\..\..\..\..";
    cd $curDir;
    del -Force -r -exclude "Repository.db" "$curDir\*";
    $directoryInfo = Get-ChildItem $curDir | Measure-Object
    
    if ($directoryInfo.count -eq 1) {
        echo "Success: The previous version was successfully removed";
    }
    else {
        echo "Error: Removing previous version failed";
        
    }

    mv $path/* ".";
    cd installService;
    node installService.js;
    Start-Service Backup380;
    $service = Get-Service | Where-Object {$_.DisplayName -eq "Backup380"} | Where-Object {$_.Status -eq "Running"};
    if (!$service) {
        $count = 0;
        do {
            $count++;
            if ($count -eq 20) {
                Start-Service Backup380;
                break;
            }
            $service = Get-Service | Where-Object {$_.DisplayName -eq "Backup380"} | Where-Object {$_.Status -eq "Running"}
            Start-Sleep -Seconds 10
        }while (!$service)

        if ($count -eq 20) {
            $service = Get-Service | Where-Object {$_.DisplayName -eq "Backup380"} | Where-Object {$_.Status -eq "Running"};
            if (!$service) {
                echo "Error: Starting the Service failed";
                exit;
            }
            else {
                echo "Success: Backup380 is now installed";
                echo "Operation finished";
                Start-Process http://localhost:8380/setup
            }
        }
        else {
            echo "Success: Backup380 is now installed";
            echo "Operation finished";
            Start-Process http://localhost:8380/setup
        }
    }
    else {
        echo "Success: Backup380 is now installed";
        echo "Operation finished";
    }
}

if ($mode -eq "i") {
    $exepath = Get-WmiObject win32_service | ? {$_.Name -eq 'backup380.exe'} |select Pathname|Format-Wide -Property PathName -AutoSize|Out-String
    
    if($exepath){
        echo "Error: Backup380 is already installed";
        exit;
    }
    if(!(Test-Path -Path $path )){
        New-Item -ItemType Directory -Force -Path $path;
    }
    if ($update) {
        <#$exepath = Get-WmiObject win32_service | ? {$_.Name -eq 'backup380.exe'} |select Pathname|Format-Wide -Property PathName -AutoSize|Out-String
        $exepath = $exepath.Trim();
        $exepath = $exepath.Replace("`"", "");
        Stop-Service -Name "Backup380";
        sc.exe delete "backup380.exe";
        $path = "$exepath\..\..\..\..";
        del -Force -r -exclude "Repository.db" "$path\*";
        $directoryInfo = Get-ChildItem $path | Measure-Object
        
        if ($directoryInfo.count -eq 1) {
            echo "Success: The previous version was successfully removed";
        }
        else {
            echo "Error: Removing previous version failed";
            exit;
        }#>
        cd "$path";
        try {
            $R = curl -Uri https://github.com/20150055/backup/archive/gh-pages.zip -OutFile master.zip;
        }
        catch {
            $message = $_.Exception.Message;
            echo "Error: Downloading of Backup380 failed check your internet connection";
            exit;
        }

        Expand-Archive -Path master.zip -DestinationPath $path;
        Copy-Item "backup-gh-pages\*" -Destination $path -Recurse -Force;
        del master.zip;
        del -r backup-gh-pages;
        $version = Invoke-WebRequest -Uri "https://api.github.com/repos/restic/restic/releases/latest" -UseBasicParsing | ConvertFrom-Json| Select tag_name;
        $version = $version.tag_name;
        $version = $version.substring(1);
        
        curl "https://github.com/restic/restic/releases/download/v$version/restic_${version}_windows_amd64.zip" -o "restic.zip";
        Expand-Archive "restic.zip";
        Rename-Item -Path "./restic/restic_${version}_windows_amd64.exe" -NewName "restic.exe";
        Copy-Item "./restic/restic.exe" -Destination "service/build";
        del restic.zip;
        del -r restic;


        curl "https://download.sysinternals.com/files/PSTools.zip" -o "PsTools.zip";
        Expand-Archive "PsTools.zip";
        Copy-Item "./PsTools/PsExec.exe" -Destination "scripts";
        del PsTools.zip;
        del -r PsTools;

        if ((Test-Path -Path ".\service") -and (Test-Path -Path ".\installService")) {
            echo "Success: Successfully downloaded and extracted the Backup Data";
        }
        else {
            echo "Error: while downloading or extracting the Backup380 data. Check your Internet Connection";
            exit;
        }
        cd $path\service;
        npm install;
        cd $path\scripts;
        npm install;
        node generatecert.js;
        cd $path\installService;
        npm install node-windows;
        node installService.js;
        $exepath = Get-WmiObject win32_service | ? {$_.Name -eq 'backup380.exe'} |select Pathname|Format-Wide -Property PathName -AutoSize|Out-String
        $exepath = $exepath.Trim();
        $exepath = $exepath.Replace("`"", "");
        Stop-Service -Name "Backup380";
        sc.exe delete "backup380.exe";
        $curDir = "$exepath\..\..\..\..";
        cd $curDir;
        del -Force -r -exclude "Repository.db" "$curDir\*";
        $directoryInfo = Get-ChildItem $curDir | Measure-Object
        
        if ($directoryInfo.count -eq 1) {
            echo "Success: The previous version was successfully removed";
        }
        else {
            echo "Error: Removing previous version failed";
            
        }
    
        mv $path/* ".";
        cd installService;
        node installService.js;
        Start-Service Backup380;
        $service = Get-Service | Where-Object {$_.DisplayName -eq "Backup380"} | Where-Object {$_.Status -eq "Running"};
        if (!$service) {
            $count = 0;
            do {
                $count++;
                if ($count -eq 20) {
                    Start-Service Backup380;
                    break;
                }
                $service = Get-Service | Where-Object {$_.DisplayName -eq "Backup380"} | Where-Object {$_.Status -eq "Running"}
                Start-Sleep -Seconds 10
            }while (!$service)
    
            if ($count -eq 20) {
                $service = Get-Service | Where-Object {$_.DisplayName -eq "Backup380"} | Where-Object {$_.Status -eq "Running"};
                if (!$service) {
                    echo "Error: Starting the Service failed";
                    exit;
                }
                else {
                    echo "Success: Backup380 is now installed";
                    echo "Operation finished";
                    Start-Process http://localhost:8380/setup
                }
            }
            else {
                echo "Success: Backup380 is now installed";
                echo "Operation finished";
                Start-Process http://localhost:8380/setup
            }
        }
        else {
            echo "Success: Backup380 is now installed";
            echo "Operation finished";
        }
    }else{

    
    cd "$path";
    
    try {
        $R = curl -Uri https://github.com/20150055/backup/archive/gh-pages.zip -OutFile master.zip;
    }
    catch {
        $message = $_.Exception.Message;
        echo "Error: Downloading of Backup380 failed check your internet connection";
        exit;
    }

    Expand-Archive -Path master.zip -DestinationPath $path;
    Copy-Item "backup-gh-pages\*" -Destination $path -Recurse -Force;
    del master.zip;
    del -r backup-gh-pages;
    $version = Invoke-WebRequest -Uri "https://api.github.com/repos/restic/restic/releases/latest" -UseBasicParsing | ConvertFrom-Json| Select tag_name;
    $version = $version.tag_name;
    $version = $version.substring(1);
    curl "https://github.com/restic/restic/releases/download/v$version/restic_${version}_windows_amd64.zip" -o "restic.zip";

    Expand-Archive "restic.zip";
    Rename-Item -Path "./restic/restic_${version}_windows_amd64.exe" -NewName "restic.exe";
    Copy-Item "./restic/restic.exe" -Destination "service/build";
    del restic.zip;
    del -r restic;


    curl "https://download.sysinternals.com/files/PSTools.zip" -o "PsTools.zip";
    Expand-Archive "PsTools.zip";
    Copy-Item "./PsTools/PsExec.exe" -Destination "scripts";
    del PsTools.zip;
    del -r PsTools;

    if ((Test-Path -Path ".\service") -and (Test-Path -Path ".\installService")) {
        echo "Success: Successfully downloaded and extracted the Backup Data";
    }
    else {
        echo "Error: while downloading or extracting the Backup380 data. Check your Internet Connection";
        exit;
    }


    if (!$update) {
        Invoke-Expression "npm -v" -ErrorVariable badoutput > $null 2>&1;
        if ($badoutput) {
            curl -Uri https://nodejs.org/dist/v10.13.0/node-v10.13.0-x64.msi -OutFile node.msi;
            [Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\nodejs", [EnvironmentVariableTarget]::Machine);
            msiexec /quiet /a $path\node.msi /log $path\log.txt TARGETDIR=`"C:\Program Files`";
            $counter = 0;
            do {
                $counter++;

                Start-Sleep -Seconds 15;
                $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User");
                Invoke-Expression "npm -v" -ErrorVariable installstatus > $null 2>&1;
                
            } while (((echo $installstatus) -match "term") -and ($counter -ne 15))
            
            if ($counter -eq 15) {
                echo "Error: Timeout while waiting for node installation to finish, check your internet connection and try again. Or try to install Node.js manually if the problem still persists";
                exit;
                break;
            }
            else {
                echo "Success: Node is now installed";
            }
        } 
    }
    cd $path\service;
    npm install;
    cd $path\scripts;
    npm install;
    node generatecert.js;
    cd $path\installService;
    npm install node-windows;
    node installService.js;

    $Shell = New-Object -ComObject ("WScript.Shell");
    $Favorite = $Shell.CreateShortcut($env:PUBLIC + "\Desktop\Backup.url");
    $Favorite.TargetPath = "http://localhost:8380";
    $Favorite.Save();
    if (Test-Path -path "$env:PUBLIC\Desktop\Backup.url") {
        echo "Success: The Desktop Shortcut for Backup380 is now installed";
    }
    else {
        echo "Error: Creating the desktop shortcut failed";
    }
    certutil -addstore "Root" "$path/service/build/cert.cert";
    $service = Get-Service | Where-Object {$_.DisplayName -eq "Backup380"} | Where-Object {$_.Status -eq "Running"};
    if (!$service) {
        $count = 0;
        do {
            $count++;
            if ($count -eq 20) {
                $test = Get-Service | Where-Object {$_.DisplayName -eq "Backup380"} | Where-Object {$_.Status -eq "Running"}
                if($test){
                    Start-Service Backup380;
                } else {
                    echo "Error: The Installation of the Backup380 service failed";
                }
                break;
                
            }
            $service = Get-Service | Where-Object {$_.DisplayName -eq "Backup380"} | Where-Object {$_.Status -eq "Running"}
            Start-Sleep -Seconds 10
        }while (!$service)
        Start-Sleep -Seconds 10
        if ($count -eq 20) {
            $service = Get-Service | Where-Object {$_.DisplayName -eq "Backup380"} | Where-Object {$_.Status -eq "Running"};
            if (!$service) {
                echo "Error: Starting the Service failed";
                exit;
            }
            else {
                echo "Success: Backup380 is now installed";
                echo "Operation finished";
                Start-Process http://localhost:8380/setup
            }
        }
        else {
            echo "Success: Backup380 is now installed";
            echo "Operation finished";
            Start-Process http://localhost:8380/setup
        }
    }
    else {
        echo "Success: Backup380 is now installed";
        echo "Operation finished";
    }
}
}