<?php

$conn = mysqli_connect(
    'localhost',
    'root',
    '',
    'taskApp',
    '3308'
);

if($conn) {
    //echo 'Database is connected';
} else {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
    exit;
}