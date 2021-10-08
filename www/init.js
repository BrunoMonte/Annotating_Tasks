function salvar() {
  const id = $("#id").val();
  const titulo = $("#titulo").val()
  const descricao = $("#descricao").val();

  if (!titulo) return alert("Campo Título obrigatório !");
  if(!descricao) return alert("Campo Descrição obrigatório !")

    const type = !id ? "post" : "put"

  $.ajax({
    type: type,
    url: "/notes",
    data: JSON.stringify({ title: titulo, description: descricao, id: id }),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      alert(data.message);
      $("#titulo").val("");
      $("#descricao").val("");
      $("#id").val("")
      listar();
    },
    error: function (res) {
      alert(res.responseJSON.message);
    },
  });
}

function listar() {
  $(".list").html("");
  $.ajax({
    type: "get",
    url: "/notes",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      console.log(data);
      for (const note of data) {
        $(".list").append(`
            <div class="item">
                <h2>${note.title}</h2>
                <p>${note.description}</p>
            
                <button onclick="excluir('${note.id}')">Excluir</button>
                <button onclick="editar('${note.id}')">Editar</button>
            </div>
                `);
      }
    },
    error: function (res) {
      alert(res.responseJSON.message);
    },
  });
}

function excluir(id) {
    $.ajax({
      type: "delete",
      url: "/notes",
      data: JSON.stringify({ id: id }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        alert(data.message);
        listar();
      },
      error: function (res) {
        alert(res.responseJSON.message);
      },
    });
  }
function editar(id) {
    $.ajax({
      type: "get",
      url: "/notes/" + id,
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        console.log(data)
        $("#titulo").val(data.title);
        $("#descricao").val(data.description);
        $("#id").val(data.id);
      },
      error: function (res) {
        alert(res.responseJSON.message);
      },
    });
  }