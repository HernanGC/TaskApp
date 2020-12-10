<?php

include('database.php');
$search = $_POST['search'];

if (!empty($search)):
    $query = "SELECT * FROM tasks WHERE NAME LIKE '$search%'";
    $res = mysqli_query($conn, $query);
    if (!$res):
        die('Resultado no encontrado '.mysqli_error($conn));
    endif;


    $json = [];
    while ($row = mysqli_fetch_array($res)):
        $json[] = [
            'name' => $row['name'],
            'description' => $row['description'],
            'id' => $row['id']
        ];
    endwhile;
    $res_json = json_encode($json);
    echo $res_json;
endif;
