const fs = require('fs');
const path = require('path');

function replaceColors(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceColors(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            content = content.replace(/text-gray-900/g, 'text-foreground');
            content = content.replace(/text-gray-800/g, 'text-foreground');
            content = content.replace(/text-gray-700/g, 'text-foreground/90');
            content = content.replace(/text-gray-600/g, 'text-muted-foreground');
            content = content.replace(/text-gray-500/g, 'text-muted-foreground');
            content = content.replace(/bg-gray-50/g, 'bg-secondary/20');
            content = content.replace(/bg-gray-100/g, 'bg-secondary/40');
            content = content.replace(/bg-gray-200/g, 'bg-secondary/60');
            content = content.replace(/from-gray-50/g, 'from-background');
            content = content.replace(/to-gray-100/g, 'to-secondary/20');
            content = content.replace(/bg-white/g, 'bg-background');
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Fixed', fullPath);
            }
        }
    }
}

replaceColors(path.join(__dirname, 'app'));
replaceColors(path.join(__dirname, 'components'));
