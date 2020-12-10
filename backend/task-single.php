<?php

include('database.php');

if(isset($_POST['taskId'])){
    $taskId = $_POST['taskId'];
    $query = "SELECT * FROM tasks WHERE id = $taskId";
    $res = mysqli_query($conn, $query);
    if(!$res){
        die('Single task failed'.mysqli_error($conn));
    }

    $json = [];
    while($row = mysqli_fetch_array($res)){
        $json[] = [
            'name' => $row['name'],
            'description' => $row['description']
        ];
    }
    $res_json = json_encode($json);
    echo $res_json;
}