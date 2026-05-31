import java.util.*;

public class LambdaExample {
    public static void main(String[] args) {

        List<String> names = new ArrayList<>();
        names.add("Ravi");
        names.add("Anu");
        names.add("Kiran");
        names.add("Bala");

        Collections.sort(names, (a, b) -> a.compareTo(b));

        System.out.println("Sorted List:");
        System.out.println(names);
    }
}