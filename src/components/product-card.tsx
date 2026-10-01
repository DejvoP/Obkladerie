import Image from "next/image";
import { getProductSlug, type Product } from "@/lib/content";

type ProductCardProps = {
  product: Product;
  sizes?: string;
};

export function ProductCard({
  product,
  sizes = "(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 45vw",
}: ProductCardProps) {
  return (
    <a
      href={`/produkty/${getProductSlug(product)}`}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden bg-soft">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-4 text-base font-medium text-charcoal sm:text-lg">
        {product.name}
      </h3>
      <p className="mt-1 text-sm text-muted">{product.kind}</p>
      {product.colors.length > 0 ? (
        <div className="mt-3 flex gap-1.5">
          {product.colors.map((color) => (
            <span
              key={color}
              className="size-3.5 border border-line"
              style={{ backgroundColor: color }}
              aria-hidden
            />
          ))}
        </div>
      ) : null}
      {product.price ? (
        <p className="mt-3 text-sm font-medium text-charcoal sm:text-base">
          {product.price}
        </p>
      ) : null}
    </a>
  );
}
