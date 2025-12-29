"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TbUpload, TbLoader2, TbX } from "react-icons/tb";
import { toast } from "sonner";

interface ImageUploadProps {
	value?: string;
	onChange: (url: string) => void;
	label?: string;
	disabled?: boolean;
}

export function ImageUpload({
	value,
	onChange,
	label = "Upload Image",
	disabled,
}: ImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch("/api/upload-image", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Upload failed");
			}

			const data = await response.json();
			setPreviewUrl(data.url);
			onChange(data.url);
			toast.success("Image uploaded successfully");
		} catch (error) {
			console.error(error);
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to upload image",
			);
		} finally {
			setIsUploading(false);
		}
	};

	const handleRemove = () => {
		setPreviewUrl(undefined);
		onChange("");
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className="space-y-2">
			<Input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				disabled={disabled || isUploading}
				className="hidden"
				id={`image-upload-${label}`}
			/>

			{previewUrl ? (
				<div className="relative inline-block">
					<img
						src={previewUrl}
						alt="Preview"
						className="h-32 w-auto rounded-md border object-cover"
					/>
					<Button
						type="button"
						variant="destructive"
						size="icon"
						className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
						onClick={handleRemove}
						disabled={disabled}
					>
						<TbX className="h-4 w-4" />
					</Button>
				</div>
			) : (
				<Button
					type="button"
					variant="outline"
					onClick={() => fileInputRef.current?.click()}
					disabled={disabled || isUploading}
					className="w-full"
				>
					{isUploading ? (
						<>
							<TbLoader2 className="mr-2 h-4 w-4 animate-spin" />
							Uploading...
						</>
					) : (
						<>
							<TbUpload className="mr-2 h-4 w-4" />
							{label}
						</>
					)}
				</Button>
			)}
		</div>
	);
}
