export default interface IKanbanCard {
  id: number;
  text: string;
  //TODO: change to array of status cards
  label?: string;
  dueDate?: Date;
  status: any;
}
