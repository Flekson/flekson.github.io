// Получить модальный
var modal = document.getElementById("myModal");

// Получить кнопку, которая открывает модальный
var btn = document.getElementById("myBtn");

// Получить элемент <span>, который закрывает модальный
var span = document.getElementsByClassName("close")[0];

// Когда пользователь нажимает на кнопку, откройте модальный
btn.onclick = function() {
  // const data = Array.from(formNode)
  // .filter((item) => !!item.name)
  // .map((element) => {
  //   const { name, value } = element
  //   return { name, value }
  // })
  serializeForm();
  modal.style.display = "block";
  async function handleFormSubmit(event) {  
    const data = serializeForm()
    const { status } = await sendData(data)
    if (status === 200) {
      modal.style.display = "block";// Вывести "Заявка отправлена"
    }
  }
}

// Когда пользователь нажимает на <span> (x), закройте модальное окно
span.onclick = function() {
  modal.style.display = "none";
}

// Когда пользователь щелкает в любом месте за пределами модального, закройте его
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function serializeForm() {
  var formNode = document.getElementById('form'); // Сбор формы
  let data = new FormData(formNode);
  data.append("task", task.value);
  console.log(Array.from(data.entries()))

  return data;
}

async function sendData(data) {

  return await fetch('/api/apply/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  })
}


