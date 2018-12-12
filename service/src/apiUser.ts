import * as express from "express";
import { User } from "./entity/User";
import { database } from "./sqliteConnection";



const router = express.Router();

// About page route.
router.get('/about', function (req, res) {
    res.send('About this wiki');
})

//req.get(bearer)

router.post("/login", async function (request, response) {
    if (request.body.username && request.body.password) {
        try {
            const user: User = await database.loadUserByUsername(request.body.username);
            if (user.password === database.hash(request.body.password)) {
                response.json({ success: { message: "api.success.user.login" },
                                token: "TOKEN-HARDCODETOKEN"}); //Token mit uuid/v5
            } else {
                response.json({ error: { message: "api.error.user.login.missing-username" } });
            }
        } catch (error) {
            response.json({ error: { message: "api.error.user.login.user-not-found" } });
        }
    } else {
        response.json({ error: { message: "api.error.user.login.missing-data" } });
    }
});

//response.status(201).json({ message: { name: "api.success.asdf", args: { id: 1 } }, payload: { token: "asfiunwelrifujsöfjkl" } });

router.post("/register", async function (request, response) {
    if (request.body.firstName && request.body.lastName && request.body.username && request.body.email && request.body.password) {
        try {
            if(database.loadUserByEmail(request.body.email) || database.loadUserByUsername(request.body.username)){
                response.json({ success: { message: "api.error.user.register.userdata-already-exists" }});
            }else{
                database.createUser(request.body.firstName, request.body.lastName, request.body.username, request.body.email, request.body.password);
                response.json({ success: { message: "api.success.register" }});
            }
        } catch (error) {
            response.json({ error: { message: "api.error.user.register.other" } });
        }
    } else {
        response.json({ error: { message: "api.error.missing-data" }});
        // TODO: genauere errormessages
    }
});


export default router;