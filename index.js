//я сделал это задание, чтобы закрепить знания node js
var express = require('express'); // Модуль для работы с express
var bodyParser = require('body-parser'); // Модуль для форм

var app = express(); // Иницилизируем функцию в модуле express
// Переменная для отслеживания данных из форм
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs'); // Устанавливаем шаблонизатор как ejs
// Устанавливаем папку со статическими файлами
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contacts', (req, res) => {
    res.render('contacts', {again: false});
    // Указываем параметр again со значением false,
    // который говорит о том, что форма передается первый раз
});

app.post('/contacts', urlencodedParser, (req, res) => {
    // Если данные не получены, то ошибка
    if(!req.body) return res.sendStatus(400);
    // Если все поля не пустые, то показываем успешную страницу
    if(req.body.email != "" && req.body.name != "" && req.body.city != "" && req.body.message != "" && req.body.check == "on") {
        res.render('contact-success', {info: req.body});
    } else {
        // Если есть не заполненные поля, то отображаем ту же страницу и передаем на нее данные
        res.render('contacts', {info: req.body, again: true});
        // Также передаем параметр again, чтобы проверять отправляется ли форма повторно
    }

});


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});

