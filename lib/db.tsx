/* eslint-disable jsx-a11y/alt-text */
import { UNAUTHORISED_ERROR_CODE } from './status_codes'
import prisma from './prisma'
import HtmlToDocx from '@turbodocx/html-to-docx'
import type { NextApiResponse } from 'next'

export async function convertHTMLToPDF(htmlString: string): Promise<Buffer> {
    try {
        const formData = new FormData();

        const fullHTML = `<!DOCTYPE html>
            <html>
                <head>
                <meta charset="UTF-8" />
                </head>
                <body>
                ${htmlString}
                </body>
            </html>`;

        const htmlBlob = new Blob([fullHTML], {
            type: 'text/html; charset=utf-8',
        });

        formData.append(
            'fileInput',
            htmlBlob,
            `document-${Date.now()}.html`
        );

        formData.append('zoom', '1.0');

        const response = await fetch(
            `${process.env.STIRLING_PDF_URL ?? 'http://localhost:9090/api/v1/convert/html/pdf'}`,
            {
                method: 'POST',
                headers: {
                    'X-API-Key': process.env.STIRLING_PDF_API_KEY ?? '',
                    Accept: 'application/pdf',
                },
                body: formData,
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `StirlingPDF API Error: ${response.status} - ${errorText}`
            );
        }

        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);

    } catch (error) {
        console.error('HTML to PDF conversion failed:', error);
        throw error;
    }
}

export async function convertHTMLToWord(htmlString: string) {
    const fileBuffer: Buffer = await HtmlToDocx(htmlString, null, {
        table: { row: { cantSplit: true } },
        //footer: true,
        //pageNumber: true,
    }, null);
    return fileBuffer
}

export async function verifyPassword(password: string, res: NextApiResponse) {
    if (password != process.env.ADMIN_PASSWORD) {
        res.status(UNAUTHORISED_ERROR_CODE).json({ message: 'Incorrect password!' });
        return false
    }
    return true
}

export async function get_song(song_id: number) {
    const song = await prisma.song.findFirst({
        where: {
            id: song_id,
        }
    });
    return song;
}

export async function get_multiple_songs(song_ids: number[]) {
    const songs = await prisma.song.findMany({
        where: {
            id: { in: song_ids },
        }
    });
    const orderedSongs = song_ids.map((id) => songs.find((song) => song.id == id));
    return orderedSongs;
}

export async function get_session(session_id: number) {
    const song = await prisma.session.findFirst({
        where: {
            id: session_id,
        }
    });
    return song;
}
