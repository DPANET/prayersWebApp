import mainRouter  from "./routes/main.router";
import prayersController from "./controllers/prayers.controller";
import mainController from "./controllers/main.controller";

const app:mainRouter = new mainRouter([new prayersController(),new mainController()]);
app.listen();
