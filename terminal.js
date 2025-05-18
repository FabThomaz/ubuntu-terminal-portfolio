const input = document.querySelector('.input');
const output = document.getElementById('terminal-output');

function printOutput(text) {
    const div = document.createElement('div');
    div.className = 'output';
    div.innerHTML = text;
    // Insere antes da linha de input
    const inputLine = document.querySelector('.input-line');
    output.insertBefore(div, inputLine);
    setTimeout(() => {
        output.scrollTo({ top: output.scrollHeight, behavior: "auto" });
    }, 0);
}

function showLoadingBar(callback) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'output';
    loadingDiv.innerHTML = `
        <span style="color:#ffbd2e;">Baixando informações...</span>
        <div style="background:#333; border-radius:4px; width:100%; max-width:300px; height:16px; margin-top:8px; overflow:hidden;">
            <div id="loading-bar" style="background:#00ff00; width:0%; height:100%; transition:width 1s;"></div>
        </div>
    `;
    output.appendChild(loadingDiv);
    setTimeout(() => {
        output.scrollTo({ top: output.scrollHeight, behavior: "auto" });
    }, 0);
    setTimeout(() => {
        loadingDiv.querySelector('#loading-bar').style.width = '100%';
    }, 50);
    setTimeout(() => {
        loadingDiv.remove();
        callback();
    }, 1100);
}

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = input.value.trim();
        printOutput(`<span style="color:#00ff00;">user@portfolio:~$</span> ${command}`);
        const cleanCmd = command.trim().toLowerCase();
        if (cleanCmd !== 'clear' && cleanCmd !== 'exit') {
            showLoadingBar(() => handleCommand(command));
        } else {
            handleCommand(command);
        }
        input.value = '';
    }
});

function handleCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    if (cleanCmd === 'sudo apt bio') {
        printOutput(`
            <span style="color:#ffbd2e;">Bio:</span> 
            Me chamo Fab e sou um entusiasta da tecnologia, apaixonado por Linux e open source.<br>
            Adoro música, leitura, arte e explorar novas ideias.<br>
            Sempre em busca de aprender, compartilhar conhecimento e contribuir para a comunidade.<br>
            Sinta-se à vontade para explorar meus projetos e entrar em contato!
        `);
    } else if (cleanCmd === 'sudo apt info') {
        printOutput(`
    <div style="display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap;">
        <div>
            <span style="color:#ffbd2e;">Nome:</span> Fab Thomaz<br>
            <span style="color:#ffbd2e;">Idade:</span> 41 anos<br>
            <span style="color:#ffbd2e;">Endereço:</span> Osasco - SP<br>
            <span style="color:#ffbd2e;">Telefone/WhatsApp:</span> (11) 95751-4498<br>
            <span style="color:#ffbd2e;">E-mail:</span> fabthomaz@live.com<br>
        </div>
        <pre style="color:#00ff00; font-size: 1em; margin:0;">

        </pre>
    </div>
        `);
    } else if (cleanCmd === 'sudo apt skills') {
        printOutput(`
        <div>
            <span style="color:#ffbd2e;">Front-end:</span><br>
            <span style="font-size:1.2em;">
            <img src="html-5.png" alt="HTML5 logo in orange and white, representing the HTML5 markup language" title="HTML5" width="24" style="vertical-align:middle;"> HTML5 &nbsp;
            <img src="css.png" alt="CSS3 logo in blue and white, representing the CSS3 stylesheet language" title="CSS3" width="24" style="vertical-align:middle;"> CSS3 &nbsp;
            <img src="js-file.png" alt="JavaScript file icon in yellow, representing JavaScript programming language" title="JavaScript" width="24" style="vertical-align:middle;"> JavaScript &nbsp;
            <img src="react.png" alt="React logo, blue atom symbol, representing the React JavaScript library" title="React" width="24" style="vertical-align:middle;"> React
            </span>
            <br><br>
            <span style="color:#ffbd2e;">Back-end:</span><br>
            <span style="font-size:1.2em;">
            <img src="nodejs.png" alt="Node.js logo, green hexagon with Node.js text, representing Node.js runtime" title="Node.js" width="24" style="vertical-align:middle;"> Node.js &nbsp;
            <img src="python.png" alt="Python logo, blue and yellow intertwined snakes, representing Python programming language" title="Python" width="24" style="vertical-align:middle;"> Python &nbsp;
            <img src="php.png" alt="PHP logo, purple oval with PHP text, representing PHP programming language" title="PHP" width="24" style="vertical-align:middle;"> PHP
            </span>
        </div>
        `);
    } else if (cleanCmd === 'sudo apt projects') {
        printOutput(`
        <div>
            <span style="color:#ffbd2e;">SynthWave Player</span><br>
            <a href="https://synthwave-player.netlify.app/" target="_blank" style="color:#00bfff; text-decoration:underline;">
                https://synthwave-player.netlify.app/
            </a>
            <br>
            <span style="color:#cccccc;">
                Player de músicas online com tema synthwave, vídeo de fundo e playlist.
            </span>
            <br>
             <span style="color:#ffbd2e;">Ubuntu Terminal Portfolio</span><br>
            <a href="https://ubuntuterminalportfolio.netlify.app/" target="_blank" style="color:#00bfff; text-decoration:underline;">
                https://ubuntuterminalportfolio.netlify.app/
            </a>
            <br>
            <span style="color:#cccccc;">
                Veja meus projetos e habilidades, apresentados como em um terminal Ubuntu. Rápido e direto.
            </span>
        </div>
    `);
    } else if (cleanCmd === 'clear') {
        // Remove apenas os elementos de saída, mantendo a linha de input
        const outputs = output.querySelectorAll('.output');
        outputs.forEach(el => el.remove());
    } else if (cleanCmd === 'exit') {
        printOutput('<span style="color:#ff5f56;">Sessão encerrada. Obrigado por visitar!</span>');
        input.disabled = true;
        input.blur();
    } else if (cmd) {
        printOutput(`<span style="color:#ff5f56;">Comando não encontrado:</span> ${cmd}`);
    }
}
