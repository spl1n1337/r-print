<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Получаем данные из формы
  $name = isset($_POST["client-name"]) ? $_POST["client-name"] : "";
  $corpname = isset($_POST["corp-name"]) ? $_POST["corp-name"] : "";
  $phone = isset($_POST["client-phone"]) ? $_POST["client-phone"] : "";

  // Проверяем, что все поля заполнены
  if (empty($name) || empty($phone)) {
    $response = array("status" => "error", "message" => "Пожалуйста, заполните все обязательные поля формы");
    echo json_encode($response);
    exit;
  }

  // Проверяем формат номера телефона
  $phoneRegex = "/^((\+7|7|8)+([0-9]){10})$/";
  if (!preg_match($phoneRegex, $phone)) {
    $response = array("status" => "error", "message" => "Пожалуйста, введите корректный телефонный номер РФ");
    echo json_encode($response);
    exit;
  }

  // Получаем url адрес хостинга и создаем переменную from со значением from@URL
  $from = "form@" . $_SERVER['HTTP_HOST'];

  // Формируем сообщение
  $messageBody = "Телефон: " . $phone;

  if (!empty($name)) {
  $messageBody .= "\n\n" . "Имя: " . $name;
  }
  
  if (!empty($corpname)) {
  $messageBody .= "\n\n" . "Компания: " . $corpname;
  }
  
  if (!empty($address)) {
  $messageBody .= "\n\n" . "Адрес: " . $address;
  }
  
  if (!empty($message)) {
  $messageBody .= "\n\n" . "Сообщение: " . $message;
  }

  // Отправляем сообщение на указанный email-адрес
  $to = "panov1337.lp@gmail.com";

  // Присваиваем значение заголовку письма
  $subject = "Запрос на вызов курьера";

  // Помещаем в заголовок переменную from@URL
  $headers = "From: $from";

  if (mail($to, $subject, $messageBody, $headers)) {
    // Если сообщение отправлено успешно, возвращаем успешный статус
    $response = array("status" => "success", "message" => "Ваш запрос на вызов курьера успешно отправлен");
    echo json_encode($response);
  } else {
    // Если произошла ошибка при отправке сообщения, возвращаем сообщение об ошибке
    $response = array("status" => "error", "message" => "Ошибка при отправке сообщения. Попробуйте еще раз позже");
    echo json_encode($response);
  }
}