<?php

require_once __DIR__ . "/../models/CurtidaModel.php";

function criarCurtida($con){

    $dados = json_decode(file_get_contents("php://input"), true);

    if(!is_array($dados) ||
       empty($dados["id_usuario"]) ||
       empty($dados["id_publicacao"])){

        http_response_code(400);

        echo json_encode([
            "erro" => "Informe o usuário e a publicação."
        ]);

        return;
    }

    inserirCurtida($con, $dados);

    echo json_encode([
        "mensagem" => "Publicação curtida com sucesso!"
    ]);
}

function readCurtida($con){

    echo json_encode(listarCurtidas($con));
}

function deleteCurtida($con){

    $dados = json_decode(file_get_contents("php://input"), true);

    if(!is_array($dados) ||
       empty($dados["id_usuario"]) ||
       empty($dados["id_publicacao"])){

        http_response_code(400);

        echo json_encode([
            "erro" => "Informe o usuário e a publicação."
        ]);

        return;
    }

    removerCurtida($con, $dados);

    echo json_encode([
        "mensagem" => "Curtida removida com sucesso!"
    ]);
}