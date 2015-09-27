var DateBox = React.createClass({
    render: function() {
        return (
            <time>
                Hello, world! I am a CommentBox.
            </time>
        );
    },
    componentDidMount: function () {
        var socket = new WebSocket("ws://localhost:8888/ws/");
        socket.onopen = function() {
            alert("Соединение установлено.");
        };

        socket.onclose = function(event) {
            if (event.wasClean) {
                alert('Соединение закрыто чисто');
            } else {
                alert('Обрыв соединения'); // например, "убит" процесс сервера
            }
            alert('Код: ' + event.code + ' причина: ' + event.reason);
        };

        socket.onmessage = function(event) {
            alert("Получены данные " + event.data);
        };

        socket.onerror = function(error) {
            alert("Ошибка " + error.message);
        };
    }

});

var TimerExample = React.createClass({

    getInitialState: function(){

        // Это выполняется перед функцией render. Возвращаемый объект
        // присваивается в this.state, чтобы мы могли использовать его позже.

        return { elapsed: 0 };
    },

    componentDidMount: function(){

        // componentDidMount вызывается react'ом, когда компонент
        // был отрисован на странице. Мы можем установить интервал здесь:

        this.timer = setInterval(this.tick, 50);
    },

    componentWillUnmount: function(){

        // Этот метод вызывается сразу после того, как компонент удален
        // со страницы и уничтожен. Мы можем удалить интервал здесь:

        clearInterval(this.timer);
    },

    tick: function(){

        // Эта функция вызывается каждые 50мс. Она обновляет
        // счетчик затраченного времени. Вызов setState заставляет компонент перерисовываться

        this.setState({elapsed: new Date() - this.props.start});
    },

    render: function() {

        var elapsed = Math.round(this.state.elapsed / 100);

        // Это даст нам число с одной цифрой после запятой dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);

        // Хоть мы и возвращаем целый <p> элемент, react разумно обновит
        // только измененные части, содержащие переменную seconds.

        return <p>This example was started <b>{seconds} seconds</b> ago.</p>;
    }
});

var MenuExample = React.createClass({

    getInitialState: function(){
        return { focused: 0 };
    },

    clicked: function(index){

        // Обработчик клика обновит состояние
        // изменив индекс на сфокусированный элемент меню

        this.setState({focused: index});
    },

    render: function() {

        // Здесь мы читаем свойство items, которое было передано
        // атрибутом, при создании компонента

        var self = this;

        // Метод map пройдется по массиву элементов меню,
        // и возвратит массив с <li> элементами.

        return (
            <div>
                <ul>{ this.props.items.map(function(m, index){

                    var style = '';

                    if(self.state.focused == index){
                        style = 'focused';
                    }

                    // Обратите внимание на использование метода bind(). Он делает
                    // index доступным в функции clicked:

                    return <li className={style} onClick={self.clicked.bind(self, index)}>{m}</li>;

                }) }

                </ul>

                <p>Selected: {this.props.items[this.state.focused]}</p>
            </div>
        );

    }
});

// Отображаем компонент меню на странице, передав ему массив с элементами

React.render(
    <MenuExample items={ ['Home', 'Services', 'About', 'Contact us'] } />,
    document.body
);

//React.render(
//    <TimerExample start={Date.now()} />,
//    document.getElementById('content')
//);