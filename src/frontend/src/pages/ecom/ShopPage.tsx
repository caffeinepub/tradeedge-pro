import { useCart } from "@/context/CartContext";
import { categories, products } from "@/data/products";
import type { Product } from "@/data/products";
import { Link } from "@tanstack/react-router";
import { Filter, SlidersHorizontal, Star, X } from "lucide-react";
import { useMemo, useState } from "react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          fill={i <= Math.round(rating) ? "#F97316" : "none"}
          stroke={i <= Math.round(rating) ? "#F97316" : "#6B7280"}
        />
      ))}
    </div>
  );
}

export default function ShopPage() {
  const { addToCart } = useCart();
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sort, setSort] = useState("popular");
  const [filterOpen, setFilterOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const toggleCat = (cat: string) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (selectedCats.length > 0 && !selectedCats.includes(p.category))
        return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      return true;
    });
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating")
      list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [selectedCats, maxPrice, minRating, sort]);

  const SidebarContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "#F9FAFB" }}>
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.name}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCats.includes(cat.name)}
                onChange={() => toggleCat(cat.name)}
                className="accent-indigo-500"
                data-ocid="shop.checkbox"
              />
              <span className="text-sm" style={{ color: "#9CA3AF" }}>
                {cat.icon} {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label
          htmlFor="price-range"
          className="block text-sm font-semibold mb-3"
          style={{ color: "#F9FAFB" }}
        >
          Max Price: &#8377;{maxPrice.toLocaleString()}
        </label>
        <input
          id="price-range"
          type="range"
          min={299}
          max={4999}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />
        <div
          className="flex justify-between text-xs mt-1"
          style={{ color: "#9CA3AF" }}
        >
          <span>&#8377;299</span>
          <span>&#8377;4,999</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "#F9FAFB" }}>
          Min Rating
        </h3>
        <div className="space-y-1.5">
          {[0, 4, 4.5, 4.8].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="accent-indigo-500"
                data-ocid="shop.radio"
              />
              <span className="text-sm" style={{ color: "#9CA3AF" }}>
                {r === 0 ? "All ratings" : `${r}+ stars`}
              </span>
            </label>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="w-full py-2 rounded-[10px] text-sm font-semibold text-white transition-all"
        style={{ background: "#6366F1" }}
        onClick={() => {
          setSelectedCats([]);
          setMaxPrice(5000);
          setMinRating(0);
        }}
        data-ocid="shop.secondary_button"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "#0A0F1C" }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="section-title">All Products</h1>
            <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>
              {filtered.length} products found
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden flex items-center gap-2 px-3 py-2 rounded-[10px] text-sm"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#9CA3AF",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onClick={() => setFilterOpen(true)}
              data-ocid="shop.toggle"
            >
              <Filter size={15} /> Filters
            </button>
            <label htmlFor="sort-select" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 rounded-[10px] text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#F9FAFB",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              data-ocid="shop.select"
            >
              <option value="popular" style={{ background: "#111827" }}>
                Most Popular
              </option>
              <option value="price-asc" style={{ background: "#111827" }}>
                Price: Low to High
              </option>
              <option value="price-desc" style={{ background: "#111827" }}>
                Price: High to Low
              </option>
              <option value="rating" style={{ background: "#111827" }}>
                Top Rated
              </option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          <aside
            className="hidden md:block w-52 flex-shrink-0 p-4 rounded-[14px] self-start sticky top-36"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal size={15} style={{ color: "#6366F1" }} />
              <span
                className="text-sm font-semibold"
                style={{ color: "#F9FAFB" }}
              >
                Filters
              </span>
            </div>
            <SidebarContent />
          </aside>

          {filterOpen && (
            <div className="fixed inset-0 z-50 flex" data-ocid="shop.sheet">
              <div
                className="flex-1 bg-black/60"
                onClick={() => setFilterOpen(false)}
                onKeyDown={(e) => e.key === "Escape" && setFilterOpen(false)}
                role="button"
                tabIndex={0}
                aria-label="Close filter"
              />
              <div
                className="w-72 h-full overflow-y-auto p-5"
                style={{ background: "#111827" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold" style={{ color: "#F9FAFB" }}>
                    Filters
                  </span>
                  <button
                    type="button"
                    onClick={() => setFilterOpen(false)}
                    data-ocid="shop.close_button"
                    aria-label="Close filters"
                  >
                    <X size={18} style={{ color: "#9CA3AF" }} />
                  </button>
                </div>
                <SidebarContent />
              </div>
            </div>
          )}

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-16" data-ocid="shop.empty_state">
                <p
                  className="text-lg font-semibold"
                  style={{ color: "#F9FAFB" }}
                >
                  No products match your filters
                </p>
                <p className="text-sm mt-2" style={{ color: "#9CA3AF" }}>
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((p, idx) => (
                  <div
                    key={p.id}
                    className="product-card group"
                    data-ocid={`shop.item.${idx + 1}`}
                  >
                    <div className="relative overflow-hidden rounded-t-[14px] aspect-square">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {p.badge && (
                        <span className="absolute top-2 left-2 discount-badge">
                          {p.badge}
                        </span>
                      )}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                      >
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                          style={{ background: "#6366F1" }}
                          onClick={() => setQuickView(p)}
                          data-ocid="shop.secondary_button"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <p
                        className="text-xs font-medium leading-tight line-clamp-2 mb-1.5"
                        style={{ color: "#F9FAFB" }}
                      >
                        {p.name.split(" — ")[0]}
                      </p>
                      <div className="flex items-center gap-1 mb-1.5">
                        <StarRating rating={p.rating} />
                        <span
                          className="text-[10px]"
                          style={{ color: "#6B7280" }}
                        >
                          ({p.reviews.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-sm font-bold"
                          style={{ color: "#F97316" }}
                        >
                          &#8377;{p.price.toLocaleString()}
                        </span>
                        <span
                          className="text-xs line-through"
                          style={{ color: "#6B7280" }}
                        >
                          &#8377;{p.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to="/product/$id"
                          params={{ id: p.id }}
                          className="flex-1 text-xs py-1.5 rounded-lg font-semibold text-center text-white transition-all"
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                          data-ocid="shop.link"
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          className="flex-1 text-xs py-1.5 rounded-lg font-semibold text-white transition-all"
                          style={{ background: "#F97316" }}
                          onClick={() => addToCart(p)}
                          data-ocid="shop.button"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {quickView && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          data-ocid="shop.modal"
        >
          <div
            className="relative max-w-md w-full rounded-[14px] overflow-hidden animate-scale-in"
            style={{
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <button
              type="button"
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.1)", color: "#9CA3AF" }}
              onClick={() => setQuickView(null)}
              data-ocid="shop.close_button"
              aria-label="Close quick view"
            >
              <X size={16} />
            </button>
            <img
              src={quickView.image}
              alt={quickView.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <p className="font-semibold" style={{ color: "#F9FAFB" }}>
                {quickView.name.split(" — ")[0]}
              </p>
              <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>
                {quickView.description}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span
                  className="text-lg font-bold"
                  style={{ color: "#F97316" }}
                >
                  &#8377;{quickView.price.toLocaleString()}
                </span>
                <span
                  className="text-sm line-through"
                  style={{ color: "#6B7280" }}
                >
                  &#8377;{quickView.originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  className="flex-1 cta-button py-2"
                  onClick={() => {
                    addToCart(quickView);
                    setQuickView(null);
                  }}
                  data-ocid="shop.confirm_button"
                >
                  Add to Cart
                </button>
                <Link
                  to="/product/$id"
                  params={{ id: quickView.id }}
                  className="flex-1 text-center py-2 rounded-[10px] text-sm font-semibold"
                  style={{
                    background: "rgba(99,102,241,0.15)",
                    color: "#6366F1",
                    border: "1px solid rgba(99,102,241,0.3)",
                  }}
                  onClick={() => setQuickView(null)}
                  data-ocid="shop.link"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
