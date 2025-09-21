<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Profile ASCII Cat</title>
    <style>
        body {
            margin: 0;
            padding: 40px;
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace;
            background: #0d1117;
            color: #c9d1d9;
            line-height: 1.4;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .ascii-art {
            font-size: 14px;
            white-space: pre;
            color: #58a6ff;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .name {
            font-size: 28px;
            font-weight: bold;
            color: #f0f6fc;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: 16px;
            color: #7c3aed;
            margin-bottom: 20px;
        }
        
        .info-section {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #30363d;
            border-radius: 6px;
            background: #161b22;
        }
        
        .info-title {
            color: #58a6ff;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        
        .tech-item {
            background: #21262d;
            color: #f0f6fc;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            border: 1px solid #30363d;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }
        
        .social-link {
            color: #58a6ff;
            text-decoration: none;
            padding: 8px 12px;
            border: 1px solid #30363d;
            border-radius: 6px;
            background: #21262d;
            transition: all 0.2s;
        }
        
        .social-link:hover {
            background: #30363d;
            color: #f0f6fc;
        }
        
        .stats {
            text-align: center;
            margin: 20px 0;
        }
        
        .cat-speech {
            background: #1f2328;
            border: 1px solid #30363d;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            position: relative;
        }
        
        .cat-speech:before {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50px;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid #30363d;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #8b949e;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="ascii-art">
             /\_/\  
            ( o.o ) 
             > ^ <  
           /       \
          /  meow!  \
         /_________/
        </div>
        
        <div class="header">
            <div class="name">YOUR NAME</div>
            <div class="subtitle">~ discord bot developer & night owl coder ~</div>
        </div>
        
        <div class="cat-speech">
            <strong>💭 currently thinking:</strong><br>
            "why do i code better at 3am?" <br>
            "is it a bug or a feature?" <br>
            "more coffee = more code" ☕
        </div>
        
        <div class="info-section">
            <div class="info-title">🚀 what i'm working on:</div>
            → discord bots that don't crash (hopefully)<br>
            → web apps with fancy animations<br>
            → learning new frameworks to confuse myself<br>
            → debugging other people's spaghetti code
        </div>
        
        <div class="info-section">
            <div class="info-title">💻 tech stack:</div>
            <div class="tech-stack">
                <span class="tech-item">JavaScript</span>
                <span class="tech-item">TypeScript</span>
                <span class="tech-item">Python</span>
                <span class="tech-item">Node.js</span>
                <span class="tech-item">React</span>
                <span class="tech-item">Discord.js</span>
                <span class="tech-item">MongoDB</span>
                <span class="tech-item">Docker</span>
            </div>
        </div>
        
        <div class="info-section">
            <div class="info-title">📊 github stats:</div>
            <div class="stats">
                <div>🔥 current streak: keeping it alive</div>
                <div>⭐ repositories: quality > quantity</div>
                <div>🌙 most active: 11pm - 4am</div>
                <div>☕ commits per coffee: approximately 2.5</div>
            </div>
        </div>
        
        <div class="info-section">
            <div class="info-title">🎯 fun facts:</div>
            → i debug with console.log (don't judge)<br>
            → my code comments are mostly "// wtf does this do"<br>
            → stackoverflow is my second home<br>
            → i have 47 unfinished projects
        </div>
        
        <div class="social-links">
            <a href="https://discord.gg/YOUR_INVITE" class="social-link">Discord</a>
            <a href="https://github.com/YOUR_USERNAME" class="social-link">GitHub</a>
            <a href="https://twitter.com/YOUR_HANDLE" class="social-link">Twitter</a>
        </div>
        
        <div class="footer">
            <div class="ascii-art">
    /\_/\    /\_/\    /\_/\
   ( o.o )  ( ^.^ )  ( -.-)
    > ^ <    > ^ <    > ^ <
            </div>
            made with ❤️ and way too much caffeine<br>
            <em>"code is poetry, bugs are modern art"</em>
        </div>
    </div>
</body>
</html>
