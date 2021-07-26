public class 2DCartoonCenterTester {
    public static void main(String[] args){
        XYZPoint[] pointList;
        Center finder = new Center();

        Center.XYZPoint point1 = finder.new XYZPoint(1.0,1.0,1.0);
        Center.XYZPoint point2 = finder.new XYZPoint(2.0,2.0,2.0);
        Center.XYZPoint point3 = finder.new XYZPoint(3.0,3.0,3.0);
        Center.XYZPoint point4 = finder.new XYZPoint(4.0,4.0,4.0);
        Center.XYZPoint point5 = finder.new XYZPoint(5.0,5.0,5.0);
        Center.XYZPoint point6 = finder.new XYZPoint(6.0,6.0,4.0);
        Center.XYZPoint point7 = finder.new XYZPoint(7.0,7.0,3.0);
        Center.XYZPoint point8 = finder.new XYZPoint(8.0,8.0,2.0);
        Center.XYZPoint point9 = finder.new XYZPoint(9.0,9.0,1.0);
        Center.XYZPoint point10 = finder.new XYZPoint(10.0,10.0,2.5);
        
        pointList = new XYZPoint[]{point1,point2,point3,point4,point5,point6,point7,point8,point9,point10};

        XYZPoint center = finder.findCenter(pointList);
        System.out.println(center.getX() + "," + center.getY() + " is current center of list"); //should be 5.5,5.5
        System.out.println("Maximum x value is " + finder.maximumX(pointList)); //should be 10.0
        System.out.println("Minimum x value is " + finder.minimumX(pointList)); //should be 1.0
        System.out.println("Maximum y value is " + finder.maximumY(pointList)); //should be 10.0
        System.out.println("Minimum y value is " + finder.minimumY(pointList)); //should be 1.0
    }
}