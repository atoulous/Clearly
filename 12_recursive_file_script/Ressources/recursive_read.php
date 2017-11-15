<?php

  if ($argc == 2){
  function recursiveSearch($url){
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      $str = curl_exec($ch);

      $array  = split("<", $str);
      $len    = count($array) - 5;
      for ($i = 13; $i <= $len; $i++){
        $matches  = array();
        $ret      = preg_match('/"(.*?)\"/s', $array[$i], $matches);
        if ($ret && $matches[1] != "README"){
          recursiveSearch($url . $matches[1]);
        } else if ($ret && $matches[1] == "README"){
          $myfile = @fopen($url . $matches[1], "r") or die();
          $cat = @fread($myfile,1024);
          if ((strncmp($cat, "Demande à ton voisin du dessus", 25) != 0)
            && (strncmp($cat, "Demande à ton voisin de droite", 25) != 0)
            && (strncmp($cat, "Demande à ton voisin de gauche", 25) != 0)
            && (strncmp($cat, "Tu veux de l'aide ? Moi aussi !", 25) != 0)
            && (strncmp($cat, "Demande à ton voisin du dessous", 25) != 0)
            && (strncmp($cat, "Toujours pas tu vas craquer non ?", 25) != 0)
            && (strncmp($cat, "Non ce n'est toujours pas bon ...", 25) != 0)){
              echo $url . $matches[1] . "\n";
              echo $cat;
          }
          @fclose($myfile);
        }
      }
      curl_close($ch);
    }
    recursiveSearch($argv[1]);
  }

?>
