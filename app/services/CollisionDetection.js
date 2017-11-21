import { Bullet } from "../entities/index";
import { PadService } from "./index";

export const CollisionDetection = {
    Check(bullet: Bullet): boolean {
        const pad = PadService.Pad;

        if (pad == null || bullet.LastPosition == null) {
            return false;
        }

        // Do collision check
        return bullet.LastPosition.y <= pad.Top
            && bullet.State.position.y >= pad.Top
            && bullet.State.position.x >= pad.Left
            && bullet.State.position.x <= pad.Right;
    }
}
