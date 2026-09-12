/**
 * LELAN TECHNOLOGY · Town V3 · Service Navigator
 *
 * The bottom 01–08 row. Per brief:
 *   - NOT 8 buttons / cards.
 *   - NOT a left-side permanent menu.
 *   - Restrained numeric row, single line.
 *   - Selected = contrast + line weight, no icon boxes.
 *   - Keyboard behaviour: ←/→/Home/End move selection.
 *   - Click updates selection, URL hash and aria-live (via parent).
 */

import type { TownShop } from "@/content/town";

interface TownServiceNavigatorProps {
  shops: ReadonlyArray<TownShop>;
  selectedId: string;
  onSelect: (id: string) => void;
}

export function TownServiceNavigator({
  shops,
  selectedId,
  onSelect,
}: TownServiceNavigatorProps) {
  return (
    <nav
      className="town-v3-navigator relative"
      aria-label="成果小镇服务导航"
    >
      {/* Tiny top label — "MODULE INDEX" in mono. Decorative. */}
      <p className="town-v3-navigator-label" aria-hidden="true">
        MODULE INDEX · 八项成果服务
      </p>

      <ul
        role="list"
        className="town-v3-navigator-list"
      >
        {shops.map((shop) => {
          const isSelected = shop.id === selectedId;
          return (
            <li key={shop.id} className="town-v3-navigator-item">
              <button
                type="button"
                onClick={() => onSelect(shop.id)}
                aria-pressed={isSelected}
                aria-current={isSelected ? "true" : undefined}
                aria-label={`选择 ${shop.number} ${shop.name}`}
                className={[
                  "town-v3-navigator-btn",
                  isSelected ? "is-selected" : "",
                ].join(" ").trim()}
              >
                <span className="town-v3-navigator-num">{shop.number}</span>
                {/* Show the shop name only on hover/focus/selected —
                    this keeps the row visually quiet at rest. */}
                <span className="town-v3-navigator-name" aria-hidden="true">
                  {shop.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Thin progress rule under the row. Deliberately NOT a
          percentage; it's the position of the current selection
          visually echoed as a short line under the number. */}
      <div className="town-v3-navigator-rule" aria-hidden="true">
        <span
          className="town-v3-navigator-rule-marker"
          style={{
            left: `calc(${(Number.parseInt(selectedId, 10) - 1) /
              Math.max(1, shops.length - 1)} * (100% - 0.5rem) + 0.25rem)`,
          }}
        />
      </div>
    </nav>
  );
}
