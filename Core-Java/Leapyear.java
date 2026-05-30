import java.util.Scanner;

public class Leapyear {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        System.out.print("Enter a year:");
        int n = s.nextInt();
        if ((n % 4 == 400) || (n % 4 == 0 && n % 4 != 100))
            System.out.println(n + " is a Leap Year");
        else
            System.out.println(n + " is not a Leap Year");
    }

}
