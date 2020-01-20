export class Status {
    selected: boolean;

    static default(): Status {
        let status = new Status();
        status.selected = false;

        return status;
    }
}