<?php

require_once __DIR__ . "/../models/PublicacaoModel.php";

function criarPublicacao($con){

    $dados = json_decode(file_get_contents("php://input"), true);

    if(!is_array($dados) ||
       empty($dados["id_usuario"]) ||
       empty($dados["legenda"]) ||
       empty($dados["imagem_url"])
       ){

        http_response_code(400);

        echo json_encode([
            "erro" => "Informe o usuário e o conteúdo da publicação."
        ]);

        return;
    }

    $id = inserirPublicacao($con, $dados);

    http_response_code(201);

    echo json_encode([
        "mensagem" => "Publicação criada com sucesso!",
        "id" => $id
    ]);
}

function readPublicacao($con){

    echo json_encode(listarPublicacoes($con));
}

function deletePublicacao($con){

    $id = filter_var(
        $_GET["id"] ?? null,
        FILTER_VALIDATE_INT
    );

    if(!$id){
        http_response_code(400);
        echo json_encode(["erro" => "ID inválido"]);
        return;
    }

    removerPublicacao($con, $id);

    echo json_encode([
        "mensagem" => "Publicação removida com sucesso!"
    ]);
}
