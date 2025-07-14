import { Location } from '../../core/surface-items';

export class TestHelperUtil {
    public static isSameLocation(locationA: Location, locationB: Location) {
        return locationA.x === locationB.x && locationA.y === locationB.y;
    }
}
