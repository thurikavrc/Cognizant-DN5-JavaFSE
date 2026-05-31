import java.util.List;

record Person(String name, int age) {
}

public class RecordExample {
    public static void main(String[] args) {

        Person p1 = new Person("John", 20);
        Person p2 = new Person("Alice", 17);
        Person p3 = new Person("David", 25);

        System.out.println(p1);
        System.out.println(p2);

        List<Person> people = List.of(p1, p2, p3);

        System.out.println("\nAge >= 18");

        people.stream()
                .filter(p -> p.age() >= 18)
                .forEach(System.out::println);
    }
}