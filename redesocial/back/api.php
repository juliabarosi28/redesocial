<?php

header("Content-Type: aplication/json;charset=uf-8");
header("Acess-Control-Allow-Origin: *");
header("Acess-Control-Allow-Methods: GET, POST, PUT, DELETE");

require __DIR__ . "/config.php";
require __DIR__ "/routes/rotas.php";
