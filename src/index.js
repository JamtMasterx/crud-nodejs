import express from "express";
import morgan from "morgan";
import rutas from "./routes/index.routes.js";
import linksRoutes from "./routes/links.routes.js";
import authRoutes from "./routes/auth.routes.js";
import {engine} from "express-handlebars";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import customHelpers from "./lib/handelbars.js";


// Obtener la ruta del archivo actual (__filename)
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual (__dirname)
const __dirname = dirname(__filename);

// Inicializaciones
const app = express();

// Configuraciones
app.set("views", join(__dirname, "views"));

app.engine(".hbs", engine({
    defaultLayout: "main",
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"),"partials"),
    extname: ".hbs",
    helpers: customHelpers
}));

app.set("view engine",".hbs")

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Global variables
app.use((req, res, next)=>{
    next();
})

//Public
app.use(express.static(join(__dirname,"Public")))

// Rutas
app.use("/", rutas);
app.use("/links", linksRoutes);
app.use("/auth", authRoutes);

//Run server
app.listen(4000, () => {
    console.log("Servidor en puerto 4000");
});
