import type { Request, Response } from 'express';
import path from 'path';

const viewsPath = path.join(__dirname, '../views');
const stylesPath = path.join(__dirname, '../styles');
const scriptsPath = path.join(__dirname, '../js');

export default {
    getIndexPage: (req: Request, res: Response) => {
        return res.sendFile(path.join(viewsPath, 'login.html'));
    },

    getStyleFile: (req: Request, res: Response) => {
        return res.sendFile(path.join(stylesPath, req.params.file));
    },

    getScriptFile: (req: Request, res: Response) => {
        return res.sendFile(path.join(scriptsPath, req.params.file));
    }
}