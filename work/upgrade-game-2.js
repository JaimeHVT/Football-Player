const fs = require("fs");
const path = require("path");

const file = path.resolve(__dirname, "..", "index.html");
let html = fs.readFileSync(file, "utf8");

function addAfterBlock(id, addition) {
  if (html.includes(addition.trim())) return;
  const idIndex = html.indexOf(`id="${id}"`);
  if (idIndex === -1) throw new Error(`id not found: ${id}`);
  const divEnd = html.indexOf("\n        </div>", idIndex);
  if (divEnd === -1) throw new Error(`end not found: ${id}`);
  const insertAt = divEnd + "\n        </div>".length;
  html = html.slice(0, insertAt) + addition + html.slice(insertAt);
}

function addBefore(needle, addition) {
  if (html.includes(addition.trim())) return;
  const index = html.indexOf(needle);
  if (index === -1) throw new Error(`Needle not found: ${needle.slice(0, 100)}`);
  html = html.slice(0, index) + addition + html.slice(index);
}

addAfterBlock("V0012", `

        <div class="produto" id="V0013" style="display: none;">
            <div class="close"></div>
            <label id="LT393">Precision Control Boots</label>
            <img src="img/Products/1/Precision Control Boots.svg">
            <button id="BT164" onclick="vender0013()">Vender</button><br>
            <button id="BT165" onclick="usar0013_1()">Fazer treino de controle</button>
            <div class="close"></div>
        </div>`);

addAfterBlock("V0024", `

        <div class="produto" id="V0025" style="display: none;">
            <div class="close"></div>
            <label id="LT394">Electric Scooter Pro</label>
            <img src="img/Products/2/Electric Scooter Pro.svg">
            <button id="BT166" onclick="vender0025()">Vender</button><br>
            <button id="BT167" onclick="usar0025_1()">Ir ao treino de scooter</button>
            <div class="close"></div>
        </div>`);

addAfterBlock("V0043", `

        <div class="produto" id="V0044" style="display: none;">
            <div class="close"></div>
            <label id="LT395">FitBand Pro</label>
            <img src="img/Products/4/FitBand Pro.svg">
            <button id="BT168" onclick="vender0044()">Vender</button><br>
            <button id="BT169" onclick="usar0044_1()">Monitorar recuperação</button>
            <div class="close"></div>
        </div>`);

addAfterBlock("V0052", `

        <div class="produto" id="V0053" style="display: none;">
            <div class="close"></div>
            <label id="LT396">Black Cat</label>
            <img src="img/Products/5/Black Cat.svg">
            <button id="BT170" onclick="usar0053_1()">Postar foto com o gato</button>
            <div class="close"></div>
        </div>`);

html = html.replaceAll("dinheiro -= 62580;", "dinheiro -= 1000;");

addBefore("        function comprar0011(){", `        function atualizarDinheiroLoja(){
            if (idioma === "pt-Br"){
                document.getElementById("L15").textContent="Dinheiro: " + dinheiro + " €";
            } else if (idioma === "cat"){
                document.getElementById("L15").textContent="Diners: " + dinheiro + " €";
            } else if (idioma === "en"){
                document.getElementById("L15").textContent="Money: " + dinheiro + " €";
            }
        }

        function comprarProduto(codigo, preco, telaProdutos, cardProduto){
            if (dinheiro < preco){
                document.getElementById("D20").style.display="block";
                document.getElementById(telaProdutos).style.display="none";
            } else {
                dinheiro -= preco;
                produtos[codigo]++;
                atualizarDinheiroLoja();
                document.getElementById(cardProduto).style.display="none";
            }
        }

        function comprar0013(){ comprarProduto("p0013", 420, "D19", "P0013"); }
        function comprar0025(){ comprarProduto("p0025", 890, "D21", "P0025"); }
        function comprar0044(){ comprarProduto("p0044", 180, "D41", "P0044"); }
        function comprar0053(){ comprarProduto("p0053", 650, "D92", "P0053"); }

`);

addBefore("        function vender0011(){", `        function vender0013(){
            produtos.p0013--;
            dinheiro +=300;
            irParaVida();
        }

        function usar0013_1(){
            if (energia > 24){
                energia -=25;
                habPasse +=2;
                habChute +=1;
                relTreinador +=1;
                document.getElementById("D25").style.display="none";
                document.getElementById("D110").style.display="block";
            } else {
                document.getElementById("D25").style.display="none";
                document.getElementById("D27").style.display="block";
            }
        }

        function vender0025(){
            produtos.p0025--;
            dinheiro +=620;
            irParaVida();
        }

        function usar0025_1(){
            if (energia > 11){
                energia -=12;
                habVelocidade +=1;
                despesas.transporte = Math.max(20, despesas.transporte - 5);
                document.getElementById("D25").style.display="none";
                document.getElementById("D111").style.display="block";
            } else {
                document.getElementById("D25").style.display="none";
                document.getElementById("D27").style.display="block";
            }
        }

        function vender0044(){
            produtos.p0044--;
            dinheiro +=120;
            irParaVida();
        }

        function usar0044_1(){
            energia = Math.min(100, energia + 18);
            forma = Math.min(100, forma + 3);
            document.getElementById("D25").style.display="none";
            document.getElementById("D112").style.display="block";
        }

        function usar0053_1(){
            if (energia > 2){
                energia -=3;
                relTorcida +=2;
                noticiaPredefinida = 18;
                gerarNoticia();
                document.getElementById("D25").style.display="none";
                document.getElementById("D113").style.display="block";
            } else {
                document.getElementById("D25").style.display="none";
                document.getElementById("D101").style.display="block";
            }
        }

`);

addBefore(`    <div id="D29" class="aviso" style="display: none;">`, `    <div id="D110" class="aviso" style="display: none;">
        <label id="LT397">Treino de controle concluído com sucesso.</label>
        <div class="close"></div>
        <div class="infoStats">
            <label id="LT398">Energia -25</label><br>
            <label id="LT399">Passe +2</label><br>
            <label id="LT400">Finalização +1</label><br>
            <label id="LT401">Relação com o treinador +1</label>
        </div>
        <div class="close"></div>
        <button id="BT171" onclick="irParaMenu(); irParaVida()">Ok</button>
    </div>

    <div id="D111" class="aviso" style="display: none;">
        <label id="LT402">Você foi ao treino de scooter e chegou mais descansado.</label>
        <div class="close"></div>
        <div class="infoStats">
            <label id="LT403">Energia -12</label><br>
            <label id="LT404">Velocidade +1</label><br>
            <label id="LT405">Despesa semanal de transporte -5€</label>
        </div>
        <div class="close"></div>
        <button id="BT172" onclick="irParaMenu(); irParaVida()">Ok</button>
    </div>

    <div id="D112" class="aviso" style="display: none;">
        <label id="LT406">O monitoramento de recuperação ajudou você a dormir melhor.</label>
        <div class="close"></div>
        <div class="infoStats">
            <label id="LT407">Energia +18</label><br>
            <label id="LT408">Forma +3</label>
        </div>
        <div class="close"></div>
        <button id="BT173" onclick="irParaMenu(); irParaVida()">Ok</button>
    </div>

    <div id="D113" class="aviso" style="display: none;">
        <label id="LT409">A foto com o gato viralizou entre os torcedores.</label>
        <div class="close"></div>
        <div class="infoStats">
            <label id="LT410">Relação com a torcida +2</label><br>
            <label id="LT411">Energia -3</label>
        </div>
        <div class="close"></div>
        <button id="BT174" onclick="irParaMenu(); irParaVida()">Ok</button>
    </div>

`);

fs.writeFileSync(file, html, "utf8");
