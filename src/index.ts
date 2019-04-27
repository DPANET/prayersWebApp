import mainRouter  from "./routes/main.router";
import prayersController from "./controllers/prayers.controller";

const app:mainRouter = new mainRouter([new prayersController()]);
app.listen();
