import {
    FileText,
    ImageIcon,
} from "lucide-react";

export default function UploadPreview({
    uploadedDoc,
    uploadedImage,
}) {
    return (
        <div className="flex flex-wrap gap-4">
            {uploadedDoc && (
                <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 shadow-lg">
                    <FileText
                        className="text-blue-400"
                        size={18}
                    />

                    <span className="text-sm text-zinc-300">
                        {uploadedDoc.name}
                    </span>
                </div>
            )}

            {uploadedImage && (
                <div className="overflow-hidden rounded-2xl border border-zinc-800 shadow-xl">
                    <img
                        src={uploadedImage}
                        alt="preview"
                        className="h-32 w-32 object-cover"
                    />
                </div>
            )}
        </div>
    );
}