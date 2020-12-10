<?php

include('database.php');

$query = "SELECT * FROM tasks ORDER BY ID";
$res = mysqli_query($conn, $query);

if (!$res):
    die('No results obtained!'.mysqli_error($conn));
endif;

$json = [];
while ($row = mysqli_fetch_array($res)):
    $json[] = [
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
    ];
endwhile;
$jsonEncoded = json_encode($json);
echo $jsonEncoded;