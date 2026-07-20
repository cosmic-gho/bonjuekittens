const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    replacements.forEach(({ pattern, replacement }) => {
        content = content.replace(pattern, replacement);
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

// 1. Fix NextAuth Route
replaceInFile(path.join(__dirname, 'app/api/auth/[...nextauth]/route.ts'), [
    { pattern: /export const authOptions = {/, replacement: 'import { NextAuthOptions } from "next-auth";\nexport const authOptions: NextAuthOptions = {' },
    { pattern: /async session\({ session, token }\) {/, replacement: 'async session({ session, token }: any) {' },
    { pattern: /async jwt\({ token, user }\) {/, replacement: 'async jwt({ token, user }: any) {' },
    { pattern: /async redirect\({ url, baseUrl }\) {/, replacement: 'async redirect({ url, baseUrl }: any) {' }
]);

// 2. Fix Admin Tabs
const adminTabs = ['admin-breeds-tab.tsx', 'admin-inquiries-tab.tsx', 'admin-kittens-tab.tsx', 'admin-testimonials-tab.tsx'];
adminTabs.forEach(file => {
    replaceInFile(path.join(__dirname, 'components', file), [
        { pattern: /useState\(\[\]\)/g, replacement: 'useState<any[]>([])' },
        { pattern: /useState\(null\)/g, replacement: 'useState<any>(null)' },
        { pattern: /async function handleSave\((.*?)\)/, replacement: 'async function handleSave($1: any)' },
        { pattern: /async function handleDelete\((.*?)\)/, replacement: 'async function handleDelete($1: any)' }
    ]);
});

// 3. Fix Forms
const forms = ['breed-form.tsx', 'inquiry-form.tsx', 'kitten-form.tsx', 'testimonial-form.tsx'];
forms.forEach(file => {
    replaceInFile(path.join(__dirname, 'components', file), [
        { pattern: /export default function [a-zA-Z]+\(\{\s*(.*?)\s*\}\) \{/g, replacement: (match, p1) => `export default function ${match.split(' ')[2].split('(')[0]}({ ${p1} }: any) {` },
        { pattern: /async function onSubmit\((.*?)\)/g, replacement: 'async function onSubmit($1: any)' },
        { pattern: /async function handleFileChange\((.*?)\)/g, replacement: 'async function handleFileChange($1: any)' }
    ]);
});

// 4. Fix catch(error) in API routes
const apiRoutes = [
    'app/api/kittens/route.ts',
    'app/api/kittens/[id]/route.ts',
    'app/api/breeds/route.ts',
    'app/api/inquiries/route.ts',
    'app/api/testimonials/route.ts'
];
apiRoutes.forEach(file => {
    replaceInFile(path.join(__dirname, file), [
        { pattern: /catch\s*\(\s*error\s*\)/g, replacement: 'catch (error: any)' }
    ]);
});

// 5. Fix email libs
const emailLibs = ['lib/email-backup.ts', 'lib/real-email.ts'];
emailLibs.forEach(file => {
    replaceInFile(path.join(__dirname, file), [
        { pattern: /catch\s*\(\s*error\s*\)/g, replacement: 'catch (error: any)' },
        { pattern: /function logError\((.*?)\)/g, replacement: 'function logError($1: any)' }
    ]);
});
