# Site de Apresentação - Programação: O Futuro do Mundo Digital

Um site profissional e interativo para apresentação sobre programação, desenvolvido com HTML5, CSS3 e JavaScript vanilla.

## 🚀 Funcionalidades

### ✨ Características Principais
- **Tela de Introdução Animada** com efeito glitch e loader
- **Galáxia 3D Interativa** com múltiplos efeitos visuais
- **Modo Apresentação Completo** com navegação avançada
- **Sistema de Configurações** robusto
- **Suporte a Múltiplos Idiomas** (Português/Inglês)
- **Design Responsivo** para todos os dispositivos

### 🎨 Modos de Visualização
- **Modo Normal**: Efeitos balanceados
- **Modo Leve**: Animações reduzidas para melhor performance
- **Modo Turbo**: Efeitos intensificados com nebulosas extras

### 🌟 Efeitos Visuais
- Galáxia 3D com anéis rotativos
- Estrelas cadentes e partículas dinâmicas
- Nebulosas animadas
- Aurora boreal
- Buraco de minhoca
- Campo de energia
- Efeitos de vortex e espiral

### 📊 Modo Apresentação
- Navegação por slides (5 slides)
- Controles de teclado e touch
- Auto-play com timer configurável
- Indicador de progresso
- Visualização em grade
- Timer de apresentação
- Suporte a fullscreen
- Animações sincronizadas

### 🎛️ Configurações
- **Idioma**: Português Brasileiro / Inglês
- **Tema**: Escuro / Claro
- **Modo**: Normal / Leve / Turbo
- **Áudio**: Ativar / Desativar
- **Apresentação**: Iniciar / Parar

## 📁 Estrutura do Projeto

```
Site/
├── index.html              # Página principal
├── css/
│   ├── styles.css          # Estilos principais
│   └── galaxy.css          # Estilos da galáxia 3D
├── js/
│   ├── main.js             # JavaScript principal
│   ├── galaxy.js           # Efeitos da galáxia
│   └── presentation.js     # Modo apresentação
├── assets/
│   └── README.md           # Instruções de áudio
├── vercel.json             # Configuração do Vercel
└── README.md               # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Semântica moderna e acessibilidade
- **CSS3**: Animações avançadas, Grid, Flexbox
- **JavaScript ES6+**: Módulos, classes, async/await
- **Web APIs**: Fullscreen, Clipboard, Audio Context
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Orbitron e Space Mono

## 🚀 Como Usar

### 1. Visualização Local
```bash
# Abra o arquivo index.html em seu navegador
# Ou use um servidor local:
python -m http.server 8000
# Acesse http://localhost:8000
```

### 2. Configuração de Áudio
1. Adicione os arquivos de áudio na pasta `assets/`:
   - `background.mp3`
   - `background.ogg`

### 3. Deploy no Vercel
```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- **Desktop**: Experiência completa com todos os efeitos
- **Tablet**: Interface otimizada com touch
- **Mobile**: Versão compacta com performance otimizada

## ⌨️ Atalhos de Teclado

### Navegação Geral
- `ESC`: Sair do modo apresentação
- `F11`: Toggle fullscreen

### Modo Apresentação
- `←` / `→`: Navegar entre slides
- `↑` / `↓`: Navegar entre slides
- `Page Up` / `Page Down`: Navegar entre slides
- `Espaço`: Próximo slide
- `Home`: Primeiro slide
- `End`: Último slide
- `P`: Toggle auto-play
- `G`: Visualização em grade
- `T`: Toggle timer

## 🎯 Slides da Apresentação

1. **Informações do Grupo**
   - Tema: Programação: O Futuro do Mundo Digital
   - Escola: Estadual São Luiz
   - Integrantes: Alan Filipy (Criador), Victor Gabriel, Maria Eduarda Borges, Nicole Ramos

2. **Impactos da IA na Programação**
   - Otimização de código
   - Automação de tarefas
   - Análise preditiva
   - Exemplos de código

3. **Benefícios da Programação**
   - Para a sociedade: saúde, educação, inclusão
   - Para empresas: eficiência, expansão, inovação

4. **O Inglês na Programação**
   - Linguagem universal
   - Documentação e comunidade
   - Oportunidades globais
   - Exemplos práticos

5. **Exemplos de Código**
   - JavaScript moderno
   - Python
   - Java
   - Código copiável

## 🎨 Personalização

### Cores
As cores são definidas em CSS variables:
```css
:root {
    --primary-dark: #1a0033;
    --accent-dark: #6b46c1;
    --accent-light: #9333ea;
    /* ... */
}
```

### Animações
Todas as animações são configuráveis via CSS:
- Duração
- Timing functions
- Intensidade dos efeitos

### Idiomas
Para adicionar novos idiomas:
1. Adicione atributos `data-novo-idioma` aos elementos
2. Atualize o seletor de idioma
3. Modifique a função `changeLanguage()`

## 🔧 Configurações Avançadas

### Performance
- **Modo Leve**: Reduz animações para dispositivos mais lentos
- **Lazy Loading**: Carrega conteúdo sob demanda
- **Otimização**: Mínimo de reflows e repaints

### Acessibilidade
- Navegação por teclado completa
- Contraste adequado
- Semântica HTML5
- ARIA labels onde necessário

## 🌐 Navegadores Suportados

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais e de apresentação.

## 👥 Créditos

- **Desenvolvimento**: Alan Filipy
- **Design**: Inspirado em temas espaciais e tecnologia
- **Animações**: CSS3 e JavaScript vanilla
- **Ícones**: Font Awesome

---

**Nota**: Este site foi otimizado para apresentações em tela cheia, proporcionando uma experiência imersiva sobre o mundo da programação.