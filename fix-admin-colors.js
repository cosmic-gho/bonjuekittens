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
            
            // Borders
            content = content.replace(/border-gray-200/g, 'border-border');
            content = content.replace(/border-gray-300/g, 'border-border');
            
            // Text Colors
            content = content.replace(/text-purple-600/g, 'text-purple-600 dark:text-purple-400');
            content = content.replace(/text-blue-600/g, 'text-blue-600 dark:text-blue-400');
            content = content.replace(/text-yellow-600/g, 'text-yellow-600 dark:text-yellow-400');
            content = content.replace(/text-green-600/g, 'text-green-600 dark:text-green-400');
            content = content.replace(/text-red-600/g, 'text-red-600 dark:text-red-400');
            
            // Text 800 (used in badges)
            content = content.replace(/text-red-800/g, 'text-red-800 dark:text-red-300');
            content = content.replace(/text-green-800/g, 'text-green-800 dark:text-green-300');
            content = content.replace(/text-yellow-800/g, 'text-yellow-800 dark:text-yellow-300');
            content = content.replace(/text-purple-800/g, 'text-purple-800 dark:text-purple-300');
            
            // BG 100
            content = content.replace(/bg-purple-100/g, 'bg-purple-100 dark:bg-purple-900/30');
            content = content.replace(/bg-blue-100/g, 'bg-blue-100 dark:bg-blue-900/30');
            content = content.replace(/bg-yellow-100/g, 'bg-yellow-100 dark:bg-yellow-900/30');
            content = content.replace(/bg-green-100/g, 'bg-green-100 dark:bg-green-900/30');
            content = content.replace(/bg-red-100/g, 'bg-red-100 dark:bg-red-900/30');
            
            // Border 200
            content = content.replace(/border-red-200/g, 'border-red-200 dark:border-red-800/50');
            content = content.replace(/border-green-200/g, 'border-green-200 dark:border-green-800/50');
            content = content.replace(/border-yellow-200/g, 'border-yellow-200 dark:border-yellow-800/50');
            content = content.replace(/border-purple-200/g, 'border-purple-200 dark:border-purple-800/50');
            
            // BG 50 (hover states etc)
            content = content.replace(/bg-purple-50/g, 'bg-purple-50 dark:bg-purple-900/20');
            content = content.replace(/bg-blue-50/g, 'bg-blue-50 dark:bg-blue-900/20');
            content = content.replace(/bg-red-50/g, 'bg-red-50 dark:bg-red-900/20');

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Fixed', fullPath);
            }
        }
    }
}

replaceColors(path.join(__dirname, 'app/admin'));
replaceColors(path.join(__dirname, 'components'));
