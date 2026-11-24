<?php

require_once __DIR__ . "/../controllers/UsuarioControle.php";
require_once __DIR__ . "/../controllers/PublicacaoController.php";
require_once __DIR__ . "/../controllers/CurtidaController.php";

$rota = $_GET["rota"] ?? "";
$metodo = $_SERVER["REQUEST_METHOD"];

if($rota === "usuario"){

    switch($metodo){

        case "POST":
            createUsuario($con);
            break;

        case "GET":
            readUsuario($con);
            break;

        case "PUT":
            updateUsuario($con);
            break;

        case "DELETE":
            deleteUsuario($con);
            break;

        default:
            http_response_code(405);
            echo json_encode(["erro" => "Método não permitido"]);
    }

}

elseif($rota === "publicacao"){

    switch($metodo){

        case "POST":
            criarPublicacao($con);
            break;

        case "GET":
            readPublicacao($con);
            break;

        case "DELETE":
            deletePublicacao($con);
            break;

        default:
            http_response_code(405);
            echo json_encode(["erro" => "Método não permitido"]);
    }

}

elseif($rota === "curtida"){

    switch($metodo){

        case "POST":
            criarCurtida($con);
            break;

        case "GET":
            readCurtida($con);
            break;

        case "DELETE":
            deleteCurtida($con);
            break;

        default:
            http_response_code(405);
            echo json_encode(["erro" => "Método não permitido"]);
    }

}

else{

    http_response_code(404);

    echo json_encode([
        "erro" => "Rota não encontrada"
    ]);
}                          