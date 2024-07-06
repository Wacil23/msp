export type BlogArticle = {
  title: string;
  date_created: string;
  read_time: number;
  category: {
    id: string;
    title: string;
    parent_category: {
      id: string;
      title: string;
    };
  };
  image: {
    filename_disk: string;
  };
  small_description: string;
  id: string;
  content: string;
};
