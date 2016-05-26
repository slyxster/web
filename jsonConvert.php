<?php
	$filename = $argv[1];
	$fp = fopen($filename, 'r');
	$array = array_fill_keys(array_map('strtolower',fgetcsv($fp)), array());
	while ($row = fgetcsv($fp)) {
    		foreach ($array as &$a) {
        		$a[] = array_shift($row);
    		}
	}
	$json = json_encode($array);

	print_r($json);
?>
