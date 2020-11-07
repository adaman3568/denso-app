export type DataItemProps<T> = {
    Data : T
    EditModalOpen : (Data : T) => void,
    DeleteModalOpen : (Data : T) => void
}