import { type ImgHTMLAttributes, useMemo, useState } from "react";

interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  alt?: string;
  src?: string;
  fallback?: string;
  name?: string;
  size?: number;
}

const Avatar = ({ src, alt = "Avatar", fallback = "N", name, size = 32, className, ...props }: AvatarProps) => {
  const [loadingImg, setLoadingImg] = useState(true);
  const [isImgError, setisImgError] = useState(false);

  const showFallback = !src || isImgError;
  const initialsName = useMemo(() => {
    if (name) {
      const words = name.trim().split(/\s+/);
      if (words.length >= 2) {
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
      } else {
        return words[0][0].toUpperCase();
      }
    }

    return fallback;
  }, [name, fallback]);

  return (
    <div
      title={name || alt}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-3 focus:border focus:border-black ${className}`}
    >
      {!showFallback ? (
        <>
          {loadingImg && (
            <div className="flex items-center justify-center absolute inset-0 bg-neutral-3">
              <span className="text-neutral-6 font-semibold" style={{ fontSize: size * 0.4 }}>
                {initialsName}
              </span>
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => {
              setisImgError(true);
              setLoadingImg(false);
            }}
            onLoad={() => setLoadingImg(false)}
            {...props}
          />
        </>
      ) : (
        <span style={{ fontSize: size * 0.4 }} className="text-neutral-9 font-semibold select-none">
          {initialsName}
        </span>
      )}
    </div>
  );
};

export { Avatar };
