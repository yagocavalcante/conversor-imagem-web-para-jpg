function deleteDownload(row) {
    var tableBody = document.getElementById('download-table-body');
    tableBody.removeChild(row);
  }

  function convertToJPEG() {
    var fileInput = document.getElementById('image-upload');
    var files = fileInput.files;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var chance = new Chance();

    var tableBody = document.getElementById('download-table-body');

    for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var imageUrl = event.target.result;

        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          var dataURL = canvas.toDataURL('image/jpeg');

          // Gerar um nome aleatório para o arquivo
          var fileName = chance.word({ length: 8 }) + '.jpeg';

          // Criar uma nova linha na tabela de downloads
          var newRow = tableBody.insertRow();
          var nameCell = newRow.insertCell();
          var linkCell = newRow.insertCell();
          var actionCell = newRow.insertCell();

          // Adicionar o nome e link de download à linha da tabela
          nameCell.innerHTML = fileName;
          var downloadLink = document.createElement('a');
          downloadLink.href = dataURL;
          downloadLink.download = fileName;
          downloadLink.innerText = 'Download';
          linkCell.appendChild(downloadLink);

          // Adicionar o botão de exclusão à linha da tabela
          var deleteButton = document.createElement('button');
          deleteButton.className = 'delete-button';
          deleteButton.innerText = 'Excluir';
          deleteButton.addEventListener('click', function() {
            deleteDownload(newRow);
          });
          actionCell.appendChild(deleteButton);
        };

        img.src = imageUrl;
      };

      reader.readAsDataURL(files[i]);
    }
  }