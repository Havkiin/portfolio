import useScrollPosition from "./ScrollPosition";

const useScrollAmount = () : number => {
    const scrollPosition = useScrollPosition();

    const windowHeight = document.documentElement.clientHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const scrollAmount = scrollPosition / (totalHeight - windowHeight);
    return scrollAmount;
}

export default useScrollAmount;