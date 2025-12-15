import { jsPDF } from "jspdf";
import { saveAs } from 'file-saver';

export async function generatePDF(
    element: HTMLElement,
    filename: string,
    onSuccess?: () => void
): Promise<void> {
    try {
        await loadChineseFonts();

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        await pdf.html(element, {
            margin: 10,
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                onclone: (doc) => {
                    doc.body.style.fontFamily =
                        '"Noto Sans SC", "Microsoft YaHei", sans-serif';
                }
            }
        });

        const blob = pdf.output('blob');
        saveAs(blob, `${filename}.pdf`);
        onSuccess?.();

    } catch (err) {
        console.error('PDF generation failed:', err);
        throw err;
    }
}

// Load Chinese fonts into the page
async function loadChineseFonts(): Promise<void> {
    if (!document.fonts.check('12px "Noto Sans SC"')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href =
            'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap';
        document.head.appendChild(link);
    }

    await document.fonts.ready;
}
