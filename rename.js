const fs = require('fs');
const path = require('path');

function replaceName(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.next') && !fullPath.includes('.git')) {
                replaceName(fullPath);
            }
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.sql')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Text Replacements
            content = content.replace(/Royal Pride Cattery/g, 'Bonjuekittens');
            content = content.replace(/Royal Pride Kittens/g, 'Bonjuekittens');
            content = content.replace(/Royal Pride/g, 'Bonjuekittens');

            // Email/URL Replacements
            content = content.replace(/royalpridecattery/g, 'bonjuekittens');
            content = content.replace(/royalpridekittens/g, 'bonjuekittens');
            content = content.replace(/royalpride/g, 'bonjuekittens');

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Renamed in', fullPath);
            }
        }
    }
}

replaceName(path.join(__dirname, 'app'));
replaceName(path.join(__dirname, 'components'));
replaceName(path.join(__dirname, 'lib'));
replaceName(path.join(__dirname, 'prisma'));
replaceName(path.join(__dirname, 'scripts'));
