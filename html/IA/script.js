let contas = JSON.parse(localStorage.getItem("contas") || "[]");
const unidades = ["A","B","C","D","E","F","G","H"];


function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function salvar() {
  localStorage.setItem("contas", JSON.stringify(contas));
  renderContas();
  atualizarSelect(); atualizarSelectPDF();
}

function addConta() {
  const desc = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const vencimento = document.getElementById("vencimento").value;
  const nova = { id: Date.now(), desc, valor, vencimento, pagos: [] };
  contas.push(nova);
  salvar();
}

function renderContas() {
  const ul = document.getElementById("lista-contas");
  
ul.innerHTML = "";
  contas.forEach(conta => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${conta.desc}</strong> - R$ ${conta.valor.toFixed(2)} - Venc: ${formatarData(conta.vencimento)}
      <button onclick="editarConta(${conta.id})" style='margin-left: 10px;'>✏️ Editar</button> <button onclick="excluirConta(${conta.id})">🗑️ Excluir</button>
    `;
    ul.appendChild(li);
  });

  contas.forEach(conta => {
    const li = document.createElement("li");
    li.textContent = `${conta.desc} - R$ ${conta.valor.toFixed(2)} - Venc: ${formatarData(conta.vencimento)}`;
    ul.appendChild(li);
  });
}

function atualizarSelect() {
  const select = document.getElementById("contaSelecionada");
  select.innerHTML = '<option value="">-- Selecione uma conta --</option>';
  contas.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.desc;
    select.appendChild(opt);
  });
}

function gerarCheckboxes() {
  const div = document.getElementById("unidades");
  div.innerHTML = "";

  unidades.forEach(u => {
   
    const label = document.createElement("label");
    label.classList.add("boxUnidade");
    label.style.display = "block"; 

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = u;
    checkbox.id = `checkbox_${u}`;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` Unidade ${u}`));


    const obsContainer = document.createElement("div");
    obsContainer.style.marginLeft = "20px";
    obsContainer.style.display = "none";

    const inputObs = document.createElement("input");
    inputObs.type = "text";
    inputObs.placeholder = `Observação da unidade ${u}`;
    inputObs.classList.add(`obs_${u}`);
    inputObs.style.width = "100%";

    obsContainer.appendChild(inputObs);

    checkbox.addEventListener("change", () => {
      obsContainer.style.display = checkbox.checked ? "flex" : "none";
      if (!checkbox.checked) {
        inputObs.value = "";
      }
    });

    // Adiciona ao container principal
    div.appendChild(label);
    div.appendChild(obsContainer);
  });
}

function registrarPagamento() {
  const contaId = document.getElementById("contaSelecionada").value;
  if (!contaId) return alert("Selecione uma conta.");

  const conta = contas.find(c => c.id == contaId);
  const checkboxes = document.querySelectorAll("#unidades input[type=checkbox]:checked");

  conta.pagos = Array.from(checkboxes).map(cb => {
    const unidade = cb.value;
    const obsInput = document.querySelector(`.obs_${unidade}`);

    return {
      unidade: unidade,
      observacao: obsInput ? obsInput.value.trim() : ""
    };
  });

  salvar();
  alert("Pagamentos atualizados.");
}

/*function gerarRelatorio() {
  let rel = "";
  console.log(contas);
  contas.forEach(c => {
    rel += `\n${c.desc} - R$ ${c.valor.toFixed(2)} - Venc: ${c.vencimento}\n`;
    unidades.forEach(u => {
      const pago = c.pagos.some(p => p.unidade === u);
      rel += `  Unidade ${u}: ${pago  ? "✅ Pago" : "❌ Em aberto"}\n`;
    });
  });
  document.getElementById("relatorio").textContent = rel || "Nenhum dado.";
}*/

function gerarRelatorio() {
  let rel = "";
  console.log(contas);

  contas.forEach(c => {
    rel += `\n${c.desc} - R$ ${c.valor.toFixed(2)} - Venc: ${c.vencimento}\n`;

    unidades.forEach(u => {
      const pagamento = c.pagos.find(p => p.unidade === u);

      if (pagamento) {
        rel += `  Unidade ${u}: ✅ Pago`;
        if (pagamento.observacao) {
          rel += ` (Obs: ${pagamento.observacao})`;
        }
      } else {
        rel += `  Unidade ${u}: ❌ Em aberto`;
      }

      rel += `\n`;
    });
  });

  document.getElementById("relatorio").textContent = rel || "Nenhum dado.";
}

function gerarPDF() {
  const relatorio = document.getElementById("relatorio").textContent;
  if (!relatorio.trim()) return alert("Gere um relatório primeiro.");
  const win = window.open("", "_blank");
  win.document.write("<pre>" + relatorio + "</pre>");
  win.document.close();
  win.print();
}

function exportarDados() {
  const blob = new Blob([JSON.stringify(contas, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contas_recanto.json";
  a.click();
}

document.addEventListener("DOMContentLoaded", () => {
  renderContas();
  atualizarSelect(); atualizarSelectPDF();
  gerarCheckboxes();
});

function editarConta(id) {
  const conta = contas.find(c => c.id === id);
  const novaDesc = prompt("Descrição:", conta.desc);
  const novoValor = prompt("Valor (R$):", conta.valor);
  const novoVenc = prompt("Vencimento (AAAA-MM-DD):", conta.vencimento);
  if (novaDesc && novoValor && novoVenc) {
    conta.desc = novaDesc;
    conta.valor = parseFloat(novoValor);
    conta.vencimento = novoVenc;
    salvar();
  }
}

function excluirConta(id) {
  contas = contas.filter(c => c.id !== id);
  salvar();
}

function atualizarSelectPDF() {
  const select = document.getElementById("contaSelecionadaPDF");
  if (!select) return;
  select.innerHTML = '<option value="">-- Selecione uma conta --</option>';
  contas.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.desc;
    select.appendChild(opt);
  });
}


async function gerarRelatorioPDF() {
  const id = document.getElementById("contaSelecionadaPDF").value;
  if (!id) return alert("Selecione uma conta.");

  const conta = contas.find(c => c.id == id);
  if (!conta) return alert("Conta não encontrada.");

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Relatório de Conta", 20, 20);
  doc.setFontSize(12);
  doc.text("Descrição: " + conta.desc, 20, 40);
  doc.text("Valor: R$ " + conta.valor.toFixed(2), 20, 50);
  doc.text("Vencimento: " + formatarData(conta.vencimento), 20, 60);
  doc.text("Unidades que pagaram: " + (conta.pagos.length ? conta.pagos.join(", ") : "Nenhuma"), 20, 70);

  doc.save("relatorio_conta.pdf");
}
