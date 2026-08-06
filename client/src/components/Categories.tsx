import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedSection } from "../store/sliceNews";
import { categories } from "../data/categories";

export function Categories() {
  const dispatch = useDispatch();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownTop, setDropdownTop] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownTop(rect.bottom);
    }
  }, [hoveredSection]);

  return (
    <div ref={containerRef} className="flex gap-6 lg:gap-10 text-sm w-full overflow-x-auto pb-2 lg:overflow-x-visible">
      {categories.map((cat) => (
        <div
          key={cat.section}
          onMouseEnter={() => setHoveredSection(cat.section)}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="flex gap-1">
            <span
              className="cursor-pointer hover:underline hover:underline-offset-4"
              onClick={() => dispatch(setSelectedSection(cat.section))}
            >
              {cat.label}
            </span>
            <div className="flex items-center justify-center">
              <p className="text-[12px] font-extralight text-zinc-500">v</p>
            </div>
          </div>

          {hoveredSection === cat.section && (
            <div
              className="fixed left-0 right-0 w-full bg-zinc-100 shadow-xl z-50 bottom-auto pt-3"
              style={{ top: `${dropdownTop}px` }}
            >
              <div className="flex p-6 gap-0 border-t-2 border-zinc-300 max-w-300 w-full mx-auto">
                {/* SECTIONS */}
                <div className="pr-8 border-r border-zinc-200 min-w-44">
                  <h2 className="text-xs font-extralight mb-4">Sections</h2>
                  <div className="flex flex-col">
                    {cat.subsections.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm py-1 hover:underline cursor-pointer"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* NEWSLETTERS */}
                <div className="px-8">
                  <h2 className="text-xs font-extralight mb-4">Newsletters</h2>
                  <div className="flex flex-col gap-4">
                    {cat.newsletters.map((nl) => (
                      <a
                        key={nl.title}
                        href={nl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer group max-w-64"
                      >
                        <p className="text-sm font-semibold group-hover:underline">
                          {nl.title}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {nl.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
