import { useState } from "react";

/**
 * A selected id among ordered `ids`, together with the direction it was
 * reached from: 1 when it follows the previous selection, -1 when it
 * precedes it. Useful to animate tabs or slides in the direction of travel.
 */
export function useDirectionalSelection<Id extends string>(
  ids: readonly Id[],
  initialId: Id = ids[0],
) {
  const [selection, setSelection] = useState<{
    id: Id;
    direction: 1 | -1;
  }>({ id: initialId, direction: 1 });

  function select(id: Id) {
    setSelection((current) => ({
      id,
      direction: ids.indexOf(id) >= ids.indexOf(current.id) ? 1 : -1,
    }));
  }

  return { selected: selection.id, direction: selection.direction, select };
}
