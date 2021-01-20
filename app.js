const data = [
  {
    id: 1,
    name: "Eduardo",
    email: "Email@email.com",
    telefone: "(11)49999-9999",
    cidade: "São Paulo - SP",
    status: 0,
  },
  {
    id: 2,
    name: "Amanda",
    email: "Amail@email.com",
    telefone: "(11)59999-9999",
    cidade: "São Paulo - SP",
    status: 0,
  },
  {
    id: 3,
    name: "Juliana",
    email: "Jmail@email.com",
    telefone: "(11)69999-9999",
    cidade: "São Paulo - SP",
    status: 0,
  },
  {
    id: 4,
    name: "Marcos",
    email: "Mmail@email.com",
    telefone: "(11)79999-9999",
    cidade: "São Paulo - SP",
    status: 0,
  },
  {
    id: 5,
    name: "Felipe",
    email: "Fmail@email.com",
    telefone: "(11)89999-9999",
    cidade: "São Paulo - SP",
    status: 0,
  },
  {
    id: 6,
    name: "Andre",
    email: "Amail@email.com",
    telefone: "(11)99999-9999",
    cidade: "São Paulo - SP",
    status: 0,
  },
];

class dataTemplete {
  rows = document.getElementById("itens");
  rowsDelete = document.getElementById("itens-delete");
  rowsAtendido = document.getElementById("itens-atendido");
  filterStatus = 0;
  todos = [];
  dataDelete = [];
  query = [];
  data = data;

  init() {
    this.viewRows(this.filterStatus);
  }

  viewBuscar(value) {
    let row = "";
    this.query = [];
    this.query = this.data.filter((itens) => {
      return (
        itens.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >
          -1 ||
        itens.email.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
      );
    });

    this.query.forEach((el) => (row = row.concat(this.getRow(el))));
    this.rows.innerHTML = row;
  }

  onSetStatus(v) {
    this.filterStatus = v;
    this.init();
  }

  getRow(el) {
    return [
      "<tr>",
      `<td>
             <img
               src="img/7e24abd207dd6790929e9cc5a2b120c4.webp"
               width="40px"
               height="40px"
               style="border-radius: 100%"
               alt=""
             />`,
      `<td style=" font-weight: bold; font-size: 16px !important;"><a href="details.html?id=${el.id}">${el.name}</td>`,
      `<td style="color:#909090;">${el.email}</td>`,
      `<td>${el.telefone}</td>`,
      `<td style="padding-left: 90px;  padding-right: 90px;">${el.cidade}</td>`,
      `<td style="padding-left: 0px; padding-right: 20px;">`,
      `<i class="fas fa-trash" onclick="t.onDelete('${el.id.toString()}')"></i>`,
      `</td>`,
      `<td style="padding-left: 0px; padding-right: 20px;">`,
      `<i class="fas fa-list" onclick="t.onListar('${el.id.toString()}')"></i>`,
      `</td>`,
      `<td style="padding-left: 0px; padding-right: 20px;">`,
      `<i class="fas fa-check" onclick="t.onAtendido('${el.id.toString()}')"></i>`,
      `</td>`,
      `</tr>`,
    ].join("\n");
  }

  viewRows(status) {
    let row = "";
    //Filtrar dados com o status todos
    this.todos = [];
    this.todos = this.data.filter((itens) => {
      return itens.status == status;
    });

    this.todos.forEach((el) => (row = row.concat(this.getRow(el))));
    this.rows.innerHTML = row;
  }

  onDelete(id) {
    //pequisar o dado
    this.data.forEach((el) => {
      if (el.id.toString() == id) el.status = 2;
    });
    this.init();
  }

  onAtendido(id) {
    this.data.forEach((el) => {
      if (el.id.toString() == id) el.status = 1;
    });
    this.init();
  }

  onListar(id) {
    this.data.forEach((el) => {
      if (el.id.toString() == id) el.status = 0;
    });
    this.init();
  }

  onBuscar() {
    let val = document.getElementById("inputBuscar").value;
    if (val && val.trim() != "") {
      this.viewBuscar(val);
    }
  }
}

class detailTemplate {
  data = data;

  detatil = {
    id: "",
    Name: "",
    Email: "",
    Telefone: "",
    Cidade: "",
    status: 0,
  };

  elDisplay = document.getElementById("display");

  init() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("id");

    this.detatil = this.findData(myParam);
    this.elDisplay.innerText = this.detatil.name;

    //itemBtn
    let iBtn = document.getElementsByClassName("itemBtn");
    Array.from(iBtn).forEach((el) => {
      el.addEventListener(
        "mouseover",
        (event) => {
          this.setDisplay(event.target.innerText);
        },
        false
      );
    });
  }

  findData(id) {
    return this.data.find((el) => el.id.toString() == id.toString());
  }

  setDisplay(tag) {
    this.elDisplay.innerText = this.detatil[tag];
  }
}
